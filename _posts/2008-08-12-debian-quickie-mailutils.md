---
layout: post
published: true
title: "Debian Quickie: MailUtils"
excerpt: "How to ensure access to the handy, dandy `/usr/bin/mail` command on your Debian box."
---

All (except for one RHEL4 box) of the servers I run use [Debian][1]. I have become accustomed to using the default mail client `/usr/bin/mail` that ships with the O/S for reading local email coming in from cron jobs.

Well, it turns out that this handy little tool doesn’t _actually_ ship with a base Debian Etch install.

{% highlight bash %}
bash: mail: command not found
{% endhighlight %}

Grrrr!

Turns out you have to have mailutils installed to get `/usr/bin/mail`. I always forget this package name so I figured I’d post it here for easy access.

To install the necessary packages under [Debian][1] just issue the following command:

{% highlight bash %}
apt-get install mailutils
{% endhighlight %}

Enjoy the fresh maily goodness.


[1]: http://debian.org/
