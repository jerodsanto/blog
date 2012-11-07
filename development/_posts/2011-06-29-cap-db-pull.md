---
layout: post
published: true
title: "cap db:pull"
excerpt: "A quick and dirty capistrano task to pull a snapshot of your (PostgreSQL) production database into your development environment."
---

If there's one thing I've learned from [Heroku][heroku], it's that grabbing a snapshot of your production database is incredibly handy for troubleshooting.

`heroku db:pull` is so rad that I wanted to have it on other projects not hosted on their platform, so I wrote a [Capistrano][capistrano] task which accomplishes the same goal.

This task is [PostgreSQL][postgres] specific, but can be easily adapted to work with other datastores. Just replace the `pg_dump` and `pg_restore` related commands with ones that your datastore provides. The process is still the same.

{% highlight ruby %}
namespace :db do
  desc "Snapshots production db and dumps into local development db"
  task :pull, roles: :db, only: { primary: true } do
    # adjust prod_config to point to your database.yml
    prod_config = capture "cat #{shared_path}/config/database.yml"

    prod = YAML::load(prod_config)["production"]
    dev  = YAML::load_file("config/database.yml")["development"]
    dump = "/tmp/#{Time.now.to_i}-#{application}.psql"

    run %{pg_dump -x -Fc #{prod["database"]} -f #{dump}}
    get dump, dump
    run "rm #{dump}"

    system %{dropdb #{dev["database"]}}
    system %{createdb #{dev["database"]} -O #{dev["username"]}}
    system %{pg_restore -O -U #{dev["username"]} -d #{dev["database"]} #{dump}}
    system "rm #{dump}"
  end
end
{% endhighlight %}

The reason that I'm dropping and recreating the development database before running the restore is that I could not find an easier way to restore a database that has a different user and name in production than it does in development. If you know of a better way to accomplish, please let me know.

Now just run `cap db:pull` and you're on your way!

[heroku]:http://heroku.com
[capistrano]:https://github.com/capistrano/capistrano/wiki
[postgres]:http://www.postgresql.org
