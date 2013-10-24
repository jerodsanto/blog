---
layout: post
published: true
title: "Creating an SSH Tunnel to a Remote Service"
excerpt: "File this under <strong>just-blog-it-already-so-you-can-stop-googling-it</strong>"
---

File this under **just-blog-it-already-so-you-can-stop-googling-it**

Imagine having Nagios/Resque Web/Monit/Cacti/MySQL/etc all set up on one of your servers. You want to access it from your local machine, but you don't want to make it listen on a public interface and set up a firewall and all that junk.

Instead, you can use SSH to tunnel your local client to the remote server's service. The command looks like this:


{% highlight console %}
ssh user@remotehost -N -L localhost:localport:remotehost:remoteport
{% endhighlight %}

For example, let's say that [Resque Web][resque-web] is listening on port **5678** on my **jerodsanto.net** server and I want to access it via port **9999** in my local browser.

The command would be:

{% highlight console %}
ssh me@jerodsanto.net -N -L localhost:9999:jerodsanto.net:5678
{% endhighlight %}

With that command running I can visit **localhost:9999** in my browser and it will load the remote Resque Web app.

A few notes about the given flags:

* `-N` tells SSH not to execute any commands on the machine, just connect to it
* `-L` is what tells SSH to forward traffic on the given local port to the given remote port
* you can use `-f` if you want SSH to detach and run in a background process

Oh, and one more thing. If you have this host set up in your [SSH config][ssh-config], you can use that too.

So, if I had created an SSH host named **jms**, the command would instead be:

{% highlight console %}
ssh jms -N -L localhost:9999:jms:5678
{% endhighlight %}

Happy tunneling!

[resque-web]:https://github.com/defunkt/resque-web
[ssh-config]:/2009/05/avoid-sore-fingers-while-sshing-around/
