---
layout: post
published: true
title: "Quickly Determine Your Current Heroku Database Size"
excerpt: "Heroku does not expose the current database size of your application via their web interface or command-line tool, but its pretty easy to get at."
---

Heroku's free offering includes a 5MB shared database. After your database grows past that, you'll have to upgrade to their (as of now) $15 per month shared database which can grow up to 20GB.

5MB ain't much, but it will get you started. But how do you know where your app currently stands? Heroku does not expose the current database size of your application via their web interface or command-line tool, but its pretty easy to get at.

If you have Postgresql installed on your local machine, you can connect directly to your app's database like so:

1) Connect using the `heroku` command:

{% highlight console %}
heroku pg:psql
{% endhighlight %}

2) Run this query:

{% highlight mysql %}
SELECT pg_size_pretty(pg_database_size('postgres'));
{% endhighlight %}

If you do _not_ have Postgresql installed on your local machine, you can use ActiveRecord to run the query:

1) Connect to your app's console:

{% highlight console %}
heroku console
{% endhighlight %}

2) Run this code:

{% highlight ruby %}
ActiveRecord::Base.connection.execute("SELECT pg_size_pretty(pg_database_size('postgres'))").first
{% endhighlight %}
