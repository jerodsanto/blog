---
layout: post
published: true
title: "Symlink Your Samba Shares"
excerpt: "Oftentimes a symbolic link is just the quickest/easiest solution to the task at hand."
---

Lets face it, oftentimes a symbolic link is just the quickest/easiest solution to the task at hand.

To configure [Samba][1] to allow symlinking directories/files into your shared directories, add the following three lines to the global section of `smb.conf`:

{% highlight bash %}
follow symlinks = yes
wide symlinks = yes
unix extensions = no
{% endhighlight %}

Easy peasy lemon squeezy.


[1]: http://www.samba.org
