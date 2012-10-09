---
layout: post
published: true
title: "Skype Tip: Roll Your Own Mentions System"
excerpt: "Mentions are a great way to keep the signal-to-noise ratio high in group chats. Unfortunately, Skype has no such feature. Fortunately, you can roll your own pretty easily. Here's how."
---

Mentions (being notified only when your name is referenced) are a great way to keep the signal-to-noise ratio high in group chats. [Skype][skype] is lame. It has no such feature. BUT!

You can roll your own pretty easily.

Skype has a handful of commands that you can issue from your client. Execute `/help` in your client and you'll see a list like this one:

[![][skype-commands-pic]][skype-commands-help]

The two commands we'll use for our Mentions system are `alertsoff` and `alertson`.

First, disable all alerts for the current chat room by executing the following in your Skype window:

{% highlight console %}
/alertsoff
{% endhighlight %}

Then, enable alerts for strings that match your name by executing the following in your Skype window (replace "jerod" with your name):

{% highlight console %}
/alertson jerod
{% endhighlight %}

And there you have it. You will no longer be bothered by anything people are saying in that chat unless they directly reference you by name. A few details on how this works:

1.  It is case-insensitive, so "jerod" will match "JEROD" and "Jerod"
2.  It does not match sub-strings, so "jer" will not match "jerod"
3.  Each time you execute `alertson` it overwrites the previous rule
4.  You can pass `alertson` many strings and it will match them all

Point 4 is especially useful when you don't know what people will be calling you. So, to alert on all the things that people might call me, I'd execute:

{% highlight console %}
/alertson jerod santo jer sant0sk1 studly jefe boss phatty cheetos
{% endhighlight %}

You get the idea...

Hopefully this makes your Skype experience suck a little less!

[skype]:http://skype.com
[skype-commands-pic]:http://jerodsanto.net/drop/skype-available-commands.png
[skype-commands-help]:https://support.skype.com/en/faq/FA10042/what-are-chat-commands-and-roles
