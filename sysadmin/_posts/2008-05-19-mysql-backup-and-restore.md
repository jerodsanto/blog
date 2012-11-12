---
layout: post
published: true
title: "MySQL backup and restore"
excerpt: "A reference for how to backup and restore MySQL databases, including optional compression."
---

## Create the backup

{% highlight bash %}
mysqldump --add-drop-table -h [host] -u [user] \
-p [databasename] > [backupfile].sql
{% endhighlight %}

**Optionally**

Specify a table -

{% highlight bash %}
 ...[databasename] (tablename tablename tablename) ...
{% endhighlight %}

Add compression -

{% highlight bash %}
 ...[databasename] | bzip2 -c > backupfile.sql.bz2
{% endhighlight %}

## Restore from backup

Create database if it doesn't already exist (from inside mysql client)

{% highlight bash %}
mysql> create database [databasename]
{% endhighlight %}

Run the restore

{% highlight bash %}
mysql -h [host] -u [user] -p [databasename] < [backupfile].sql
{% endhighlight %}

**Optionally**

Uncompress before restoring -

{% highlight bash %}
bzip2 -d backupfile.sql.bz2
{% endhighlight %}
