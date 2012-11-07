---
layout: post
published: true
title: "Rsnapshot (Rsync) Gotcha"
excerpt: "How to troubleshoot a cryptic Rsnapshot error"
---

If you're trying to backup a remote host using [rsnapshot][1] (or rsync by itself) and run into one of the following ambiguous errors:

**rsnapshot version:**

{% highlight console %}
ERROR: /usr/bin/rsync returned 12 while processing ...
{% endhighlight %}

**rsync version:**

{% highlight console %}
rsync error: error in rsync protocol data stream (code 12)
{% endhighlight %}

It's probably because you don't have rsync installed on the remote host (doh!)


[1]: http://rsnapshot.org/
