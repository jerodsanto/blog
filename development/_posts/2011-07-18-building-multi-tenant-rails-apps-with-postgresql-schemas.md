---
layout: post
published: true
title: "Building Multi-tenant Rails Apps with PostgreSQL Schemas"
excerpt: "There are a few different ways to go about building a multi-tenant Rails application. One way that works really well for certain apps is to use PostgreSQL's 'schemas' feature to partition each tenant's data. This article lays out why you might want to build your multi-tenant app this way and how to go about it."
---

Many Rails apps need to accommodate multiple tenants. There are a few different ways to go about this, each with their set of pros and cons. Guy Naor did a great job of diving into the pros and cons of each strategy in his [2009 Acts As Conference talk][guynaor] (a must-watch).

One of the multi-tenant strategies he presented takes advantage of a feature specific to [PostgreSQL][pg] called "Schemas". His talk was technical, but didn't go in-depth into implementation details. There are a few blog posts, [Stack Overflow][sothread] threads, and other semi-related flotsam around the tubes on how to actually accomplish a multi-tenant app using this strategy, but I still had to figure out many things on my own so I figured I'd document the setup.

### Why PostgreSQL Schemas

Guy laid out three basic strategies for multi-tenant Rails apps.

1.  Separate databases for each tenant
2.  One database with records scoped through a "tenant" relationship
3.  One database with separate schemas for each tenant (PostgreSQL only)

I won't lay out all the factors in choosing a multi-tenant strategy, but I'll tell you when you might want to choose strategy #3. If your app has the following characteristics:

1.  Each tenant's data is private and should not be leaked across tenants
2.  You have little or no need to run queries that aggregate across all tenants
3.  You may have many tenants and can't handle high administration overhead

There are, of course, nuances to every application so, seriously, [go watch his talk][guynaor] and make the decision on your own. If you decide you'd like to go the PostgreSQL Schema route, come back and finish reading this post.

### How PostgreSQL Schemas Work

"Schema" is such a terrible name for this feature. When most people hear the term "schema" they think of a data definition of some sort. This is not what [PostgreSQL schemas][schemadocs] are. I'm sure the PostgreSQL devs had their reasons, but I really wish they would have named it more appropriately. "Namespaces" would have been apropos.

Anywho, the easiest way for me to describe PostgreSQL schemas (besides telling you that they are, indeed, namespaces for tables) is to relate them to the UNIX execution path. When you run a UNIX command without specifying its absolute path, your shell will work its way down the `$PATH` until it finds an executable of the same name.

Given that your `$PATH` looks like this:

`/usr/local/bin:/usr/bin`

When you type `vim` your shell will look for `vim` in `/usr/local/bin` and then in `/usr/bin` before giving up.

PostgreSQL schemas work pretty much the same way. Every table in a PostgreSQL database belongs to a schema. By default tables go in the `public` schema. You can see the current schema search path in psql by executing:

{% highlight sql %}
SHOW search_path;
{% endhighlight %}

If you haven't done any schema-related stuff yet, you'll see `"$user",public` as the search path. This means when you query a table without explicitly specifying the table's <strike>namespace</strike> schema it will first look in your user's schema (every user gets one) and then in the public schema before giving up. That means that:

{% highlight sql %}
SELECT count(*) FROM users;
{% endhighlight %}

Is functionally equivalent to:

{% highlight sql %}
SELECT count(*) FROM public.users;
{% endhighlight %}

What does all this mean? It means you can have the same table many times in one database as long as they each live in their own schema and you can query those tables without having to explicitly state which schema they're in. You just have to set the schema search path appropriately and PostgreSQL will handle the rest.

In other words, you get data separation across tenants by modifying very little of your application logic!

### Setting the Search Path

So how do you do all that in Rails?

{% aside notice %}
NOTE: This implementation targets Rails 3.0.9 and PostgreSQL 9.0.4. YMMV
{% endaside %}

First, let's assume you have a `Tenant` model which holds a unique subdomain string. When an HTTP request comes in with a subdomain in it, you find the appropriate tenant and use its primary key (`id`) to set the search path (you could use the subdomain itself, but you may want to allow your users to change their subdomain).

This logic should happen on every request so put it in a `before_filter` in your `ApplicationController`.

{% highlight ruby %}
class ApplicationController < ActionController::Base
  before_filter :handle_subdomain

  def handle_subdomain
    if @tenant = Tenant.find_by_subdomain(request.subdomain)
      PgTools.set_search_path @tenant.id
    else
      PgTools.restore_default_search_path
    end
  end
end
{% endhighlight %}

The logic isn't difficult to follow. You set the search path to the matched tenant if one is found. Otherwise you restore the default search path. The database bits are tucked away inside `PgTools`, which is a very small module you can drop into `lib/`. Here are the relevant methods:

{% highlight ruby %}
module PgTools
  extend self

  def default_search_path
    @default_search_path ||= %{"$user", public}
  end

  def set_search_path(name, include_public = true)
    path_parts = [name.to_s, ("public" if include_public)].compact
    ActiveRecord::Base.connection.schema_search_path = path_parts.join(",")
  end

  def restore_default_search_path
    ActiveRecord::Base.connection.schema_search_path = default_search_path
  end
end
{% endhighlight %}

These methods are pretty self-explanatory, but I will point out that the `set_search_path` method will include the public search path by default, but it can be disabled by passing `false` as a second parameter to the method. This will come into play a little further down.

In the case of a tenant with id of "4", at the end of your `handle_subdomain` method the PostgreSQL schema search path will look like: `4, public`

For the remainder of the request all of your queries will be sent through the "4" schema first as long as you have tables in it to be used. So how do you get all the tables in each tenant's schema?

### Adding New Tenants

The current database table definitions need to be loaded into the private schema of each new tenant of the system. You can perform this task in a callback after the tenant record has been created. Something like this:

{% highlight ruby %}
class Tenant < ActiveRecord::Base
  after_create :prepare_tenant

  private

  def prepare_tenant
    create_schema
    load_tables
  end

  def create_schema
    PgTools.create_schema id unless PgTools.schemas.include? id.to_s
  end

  def load_tables
    return if Rails.env.test?
    PgTools.set_search_path id, false
    load "#{Rails.root}/db/schema.rb"
    PgTools.restore_default_search_path
  end
end
{% endhighlight %}

After the `create_schema` method ensures that the new tenant has their own schema, the `load_tables` method sets the search path to its schema and loads the "schema.rb" file. You may notice that this time `false` is being sent to the `set_search_path` method. That is because you only want the loaded "schema.rb" file to affect the tenant's schema, NOT the public schema.

{% aside notice %}
NOTE: This code may take awhile to execute and should be run in a background process.
{% endaside %}

Here you're using two more methods from the `PgTools` module. Here are their implementations:

{% highlight ruby %}
def create_schema(name)
  sql = %{CREATE SCHEMA "#{name}"}
  ActiveRecord::Base.connection.execute sql
end

def schemas
  sql = "SELECT nspname FROM pg_namespace WHERE nspname !~ '^pg_.*'"
  ActiveRecord::Base.connection.query(sql).flatten
end
{% endhighlight %}

At this point you've accomplished the bulk of the logic that goes into a multi-tenant Rails app with PostgreSQL schemas, but there are a few other things that you'll want to be aware of.

### Migrating Tenants

Since every tenant has their own set of tables, it is no longer good enough to just run `rake db:migrate` to make database changes. Instead, each tenant must have its schema's tables migrated.

This isn't too bad, you just need a custom rake task which loops over the `tenants` table, setting the schema search path and migrating the database. Add this to `lib/tasks/tenants.rake`

{% highlight ruby %}
namespace :tenants do
  namespace :db do
    desc "runs db:migrate on each tenant's private schema"
    task migrate: :environment do
      verbose = ENV["VERBOSE"] ? ENV["VERBOSE"] == "true" : true
      ActiveRecord::Migration.verbose = verbose

      Tenant.all.each do |tenant|
        puts "migrating tenant #{tenant.id} (#{tenant.subdomain})"
        PgTools.set_search_path tenant.id, false
        version = ENV["VERSION"] ? ENV["VERSION"].to_i : nil
        ActiveRecord::Migrator.migrate("db/migrate/", version)
      end
    end
  end
end
{% endhighlight %}

Be sure to run this in addition to `rake db:migrate`. You may want to hook it in to the `db:migrate` task somehow. If you do, please add your solution to the comments as I have not done this yet.

This should also be hooked into your deploy process. If you're using capistrano to deploy, you can add it like so:

{% highlight ruby %}
namespace :db do
  desc "Runs rake task which migrates database tables for all tenants"
  task :migrate_tenants do
    env = "RAILS_ENV=production"
    run "cd #{release_path} && bundle exec rake #{env} tenants:db:migrate"
  end
end

after "deploy:migrate", "db:migrate_tenants"
{% endhighlight %}

That should do it!

### Shared Tables

So far this post has just compiled and distilled information available from various sources, but one thing that nobody else seems to be talking about is that not _all_ of your application's tables will be private to each tenant.

The `tenants` table itself, for example, needs to be accessible to all tenants (how else will they edit their account settings?). Also, what if you want users to be able to log in to multiple tenants across the system (single sign-on)?

One way to accomplish this is to have shared tables live in the public schema and private tables live in the tenant-specific schemas. Technically, all tables must exist in the public schema for Rails to boot properly. This is not a problem. Since the search path is being set to look in the private schemas first it will find the tables there and use the right table. However, if a private schema has a `tenants` table and the public schema has the `tenants` table with data in it, the wrong one will be used.

One solution is to delete the shared tables from the private schemas. This will ensure that the search path won't find them in the private schemas and will find them in the public schema.

To accomplish this, I maintain a list of shared tables (this is kind of hacky, but the list is short) and modify the `Tenant#load_tables` method to look like this:

{% highlight ruby %}
def load_tables
  return if Rails.env.test?
  PgTools.set_search_path id, false
  load "#{Rails.root}/db/schema.rb"
  MyApp::SHARED_TABLES.each { |name| connection.execute %{drop table "#{name}"} }
  PgTools.restore_default_search_path
end
{% endhighlight %}

Imagine an application that has a shared `users` table and private `posts` and `comments` tables. With this setup the table list will looks like this:

{% highlight console %}
public.posts
public.comments
public.users
1.posts
1.comments
{% endhighlight %}

When the search path is set to `1, public` the comments and posts will be fetched from the "1" schema and the users will be fetched from the public schema. That's pretty cool, if you ask me!

This does throw a wrench in one more area of development: migrating shared tables. The private schemas will not have the shared tables in them, so you will encounter errors when looping through them and running migrations. The fix to this is simple enough, but needs to be communicated to all developers on the project.

Any migration that operates on shared tables should be short-circuited if the current schema search path is private. Add this method to `PgTools`:

{% highlight ruby %}
def private_search_path?
  !search_path.match /public/
end
{% endhighlight %}

Consider adding a boolean admin to the aforementioned shared `users` table. The migration should looks like this:

{% highlight ruby %}
class AddAdminToUsers < ActiveRecord::Migration
  def self.up
    return if PgTools.private_search_path?
    add_column :users, :admin, :boolean, default: false
  end

  def self.down
    return if PgTools.private_search_path?
    remove_column :users, :admin
  end
end
{% endhighlight %}

This migration will run as normal during `rake db:migrate` and get safely skipped during `rake tenants:db:migrate`.

### Good luck!

I hope this post serves as a guide for your own adventure into multi-tenant Rails apps on PostgreSQL. I've been using it for some time now and while there is a lot to wrap your head around and set up at the outset, it pays off in spades when you can ignore the entire problem for much of your application logic and have the peace of mind that a coding mistake won't accidentally expose your customers' sensitive data.

Let me know how you get on!

[guynaor]:http://confreaks.net/videos/111-aac2009-writing-multi-tenant-applications-in-rails
[pg]:http://www.postgresql.org
[schemadocs]:http://www.postgresql.org/docs/9.0/static/ddl-schemas.html
[sothread]:http://stackoverflow.com/questions/2782758/creating-a-multi-tenant-application-using-postgresqls-schemas-and-rails
