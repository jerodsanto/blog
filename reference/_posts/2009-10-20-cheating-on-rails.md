---
layout: post
published: true
title: "Cheating on Rails"
excerpt: "Fellow command-line junkies either love <a href='http://cheat.errtheblog.com/'>the cheat gem</a> by <a href='http://ozmm.org/'>Chris Wanstrath</a> or they've never heard of it."
---

Fellow command-line junkies either love <a href="http://cheat.errtheblog.com/" rel="external">the cheat gem</a> by <a href="http://ozmm.org/" rel="external">Chris Wanstrath</a> or they've never heard of it.

What "cheat" offers is a plethora (currently 601) of text-based cheat sheets at the tip of your fingers. Go ahead, give it a try:

{% highlight console %}
jerod@mbp:~$ sudo gem install cheat
jerod@mbp:~$ cheat apache2
{% endhighlight %}

Pretty cool, huh?

Some cheats are kind of long, so pipe them to "less" for pagination:

{% highlight console %}
jerod@mbp:~$ cheat git | less
{% endhighlight %}

List all the cheats available:

{% highlight console %}
jerod@mbp:~$ cheat sheets
{% endhighlight %}

Or find one matching a search string:

{% highlight console %}
jerod@mbp:~$ cheat sheets | grep [your search string]
{% endhighlight %}

To learn more about cheat:

{% highlight console %}
jerod@mbp:~$ cheat cheat
{% endhighlight %}

## Cheat on Rails

There a bunch of Rails-related cheats, which are great help in a pinch. Here are a few that I highly recommend:

* **status_codes** - all HTTP status codes and their matching Rails symbols
* **rails_migrations** - for when you forget valid data types
* **rubydebug** - debugging is powerful but it's easy to forget how
* **rails_tips** - nice reminders and tips for beginners
* **jquery** - you are using jQuery in your Rails apps, right?

Let me know if you find any juicy cheats that I should know about.
