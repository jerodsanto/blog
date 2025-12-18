---
title: Quickly Determine Your Current Heroku Database Size
date: '2011-01-26'
categories:
- sysadmin
draft: false
---

Heroku's free offering includes a 5MB shared database. After your database grows past that, you'll have to upgrade to their (as of now) $15 per month shared database which can grow up to 20GB.

5MB ain't much, but it will get you started. But how do you know where your app currently stands? Heroku does not expose the current database size of your application via their web interface or command-line tool, but it's pretty easy to get at.

{{< aside "alert" >}}
UPDATE: It turns out this post was 100% wrong. Heroku _does_ expose the current database size of your application via the command-line tool. Simply run `heroku info` and you'll see it in there next to "Data size" in all its glory. I can't believe I glossed that when I was looking previously. Thanks to [William Ayd](http://www.williamayd.com/) for sorting me out!
{{< /aside >}}

1) Connect to your app's console:

```console
heroku console
```

2) Run this code:

```ruby
ActiveRecord::Base.connection.execute("SELECT pg_size_pretty(pg_database_size('postgres'))").first
```

Alternatively, if you've already upgraded to one of the paid database add-ons and you have Postgresql installed locally, you can connect directly to your app's database like so:

1) Connect using the `heroku` command:

```console
heroku pg:psql
```

2) Run this query:

```mysql
SELECT pg_size_pretty(pg_database_size('postgres'));
```
