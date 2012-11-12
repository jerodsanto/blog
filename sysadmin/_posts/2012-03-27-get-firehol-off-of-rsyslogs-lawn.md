---
layout: post
published: true
title: "Get FireHOL off of RSyslog's lawn"
excerpt: "FireHOL is the best tool I've used for configuring Linux firewalls. But it can really spew its logs all over your kern.log and syslog. Getting it to stop this is non-obvious so hopefully this saves you some time."
---

[FireHOL][firehol] is the best tool I've used for configuring Linux firewalls. But it can really spew its logs all over your `kern.log` and `syslog`. Getting it to stop this is non-obvious so hopefully this saves you some time.

{% aside notice %}
This tutorial is for Debian 6 running rsyslog. As always, YMMV.
{% endaside %}

## Install FireHOL

This is the easy part.

{% highlight console %}
aptitude install firehol
{% endhighlight %}

## Make sure it can start

Debian's FireHOL package has it disabled by default. Edit `/etc/default/firehol` and set:

{% highlight console %}
START_FIREHOL=YES
{% endhighlight %}

## Set a custom log prefix

Edit `/etc/firehol/firehol.conf` and add the following:

{% highlight console %}
FIREHOL_LOG_PREFIX="firehol: "
{% endhighlight %}

This ensures that all FireHOL-generated log messages contain this string. While you're here, you might want to configure the firewall itself :)

## Create a special rule in rsyslog

Add a file at `/etc/rsyslog.d/30-firehol.conf` and make it have the following content:

{% highlight console %}
:msg, contains, "'firehol: " -/var/log/firehol.log
& ~
{% endhighlight %}

This will make all log messages that contain the "'firehol: " string log to their own file. It then skips the rest of the rules so they don't also go to `kern.log` and `syslog`. The "30" in the filename is just there to ensure that this file is evaluated before the others. I'm not sure if it's actually necessary or not.

## Restart stuff

That should be all you need to do. Now restart FireHOL and Rsyslog like so:

{% highlight console %}
/etc/init.d/firehol stop
/etc/init.d/rsyslog stop
/etc/init.d/firehol start
/etc/init.d/rsyslog start
{% endhighlight %}

Then check `/var/log/firehol.log` to make sure FireHOL is logging there.

## Bonus

You may also be getting sick of seeing this warning every time you restart FireHOL:

File '/etc/firehol/RESERVED_IPS' is more than 90 days old

The worst part is that the script to update the reserved IPs list (as of right now) 404s so you can't fix it. What you can do is this:

{% highlight console %}
touch /etc/firehol/RESERVED_IPS
{% endhighlight %}

That'll shut it up, if for only another 3 months.

[firehol]:http://firehol.sourceforge.net/
