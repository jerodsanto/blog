---
layout: post
published: true
title: "Starting Asterisk on Boot in Debian"
excerpt: "You just compiled Asterisk on your Debian server and you want to make sure it starts when you reboot. Here’s how"
---

Here’s a quickie. You just compiled [Asterisk][1] on your [Debian][2] server and you want to make sure it starts when you reboot. Here’s how:

Look in the `/contrib/init.d` folder of your Asterisk source directory. You’ll see a file called `rc.debian.asterisk`. If you installed Asterisk to the default location, don’t worry about editing this file. If you installed to a different location (eg - /usr/local), change the following line in the file:

{% highlight bash %}
DAEMON=/usr/sbin/asterisk
{% endhighlight %}

Point this at your Asterisk binary. Not sure where it is? Just type `which asterisk` from the command line and it will show you the full path.

Next, copy the file into the `/etc/init.d/` directory like so:

{% highlight bash %}
cp rc.debian.asterisk /etc/init.d/asterisk
{% endhighlight %}

(NOTE: I am renaming the file on purpose)

Now you can control Asterisk by executing this script. Make sure it starts and stops before continuing:

{% highlight bash %}
/etc/init.d/asterisk start
Starting Asterisk PBX: asterisk.
/etc/init.d/asterisk stop
Stopping Asterisk PBX: asterisk.
{% endhighlight %}

Finally, make the system run this script during the boot process:

{% highlight bash %}
update-rc.d asterisk defaults
{% endhighlight %}

Done and done. Reboot and check the process list just to be sure!


[1]: http://asterisk.org/
[2]: http://debian.org/
