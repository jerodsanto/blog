---
layout: post
published: true
title: "Debian Etch: Default Repositories"
excerpt: "In case you muck up your `/etc/apt/sources.list` and want to set it back to the defaults"
---

In case you muck up your `/etc/apt/sources.list` and want to set it back to the defaults, just copy and paste this in:

{% highlight bash %}
deb http://ftp.debian.org/debian/ etch main
deb-src http://ftp.debian.org/debian/ etch main

deb http://security.debian.org/ etch/updates main contrib
deb-src http://security.debian.org/ etch/updates main contrib
{% endhighlight %}
