---
layout: post
published: true
title: "Avoid Sore Fingers While SSHing Around"
excerpt: "Using SSH's config settings to save you keystrokes"
---

If you're anything like me, you've gotten accustomed to commands like this:

{% highlight bash %}
jerod@mbp:~$ ssh [user]@[remote.server.com]
{% endhighlight %}

If you find yourself connecting to the same machines repeatedly, save a few keystrokes by creating a handy alias for them. Create (or edit) "**~/.ssh/config**" and add as many of these as your little heart desires:

{% highlight bash %}
Host [the alias]
HostName [domain name or IP address]
User [the account to login as]
{% endhighlight %}

Now you don't have to use the full command to access the machine, just use the alias! For example, here is how I access one of my DreamHost servers:

{% highlight bash %}
jerod@mbp:~$ ssh dh
{% endhighlight %}

The same goes for SCP! So, to secure copy a file (my_file.txt) in my current directory to the same machine I would simply issue:

{% highlight bash %}
jerod@mbp:~$ scp my_file.txt dh:
{% endhighlight %}

Ahh... that is easy on the fingers! What else can we do with SSH config files?
