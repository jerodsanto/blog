---
layout: post
published: true
title: "Debian: Disable Sytem Beep"
excerpt: "Here’s how to turn off that annoying system beep at your Debian CLI"
---

Here’s how to turn off that annoying system beep at your Debian CLI:

Just edit `/etc/modprobe.d/blacklist` and append this:

{% highlight bash %}
blacklist pcspkr
{% endhighlight %}

Then reboot. Can’t wait for reboot? type this command:

{% highlight bash %}
sudo rmmod pcspkr
{% endhighlight %}
