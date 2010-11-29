---
layout: post
published: true
title: "Getting ready for Lenny"
excerpt: "You don't need to fire up an editor to switch your APT repositories from Debian 4 (Etch) to Debian 5 (Lenny)"
---

You don't need to fire up an editor to switch your APT repositories from Debian 4 (Etch) to Debian 5 (Lenny):

{% highlight ruby %}
ruby -i -pe '$_.gsub!("etch","lenny")' /etc/apt/sources.lst
{% endhighlight %}
