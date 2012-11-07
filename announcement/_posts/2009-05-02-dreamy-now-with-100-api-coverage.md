---
layout: post
published: true
title: "Dreamy: Now With 100% API Coverage"
excerpt: "The folks at DreamHost were gracious enough to provide me with a complimentary Private Server account so I could expand Dreamy's functionality."
---

The folks at DreamHost were gracious enough to provide me with a complimentary Private Server account so I could expand [Dreamy's][1] functionality. What a nice surprise that was!

So, to ensure they got their money's worth, I added all the Private Server API calls to Dreamy! This means that Dreamy now covers the entire DreamHost API. Check out all the new commands added to "dh" (the accompanying command-line tool):

{% highlight bash %}
ps                                 # list private servers
ps:add <web|mysql> <yes|no>        # adds a private server of type <web|mysql>
ps:pending                         # list private servers scheduled to be created
ps:reboots <name>                  # list historical reboots for <name>
ps:reboot <name> now!              # reboot <name> now! (proceed with caution)
ps:remove                          # removes all pending private servers
ps:settings <name>                 # list settings for private server <name>
ps:set <name> <setting> <value>    # change <setting> on <name> to <value>
ps:size <name>                     # list historical memory sizes for <name>
ps:size <name> <value>             # set new memory <value> for <name>
ps:usage <name>                    # list historical memory & CPU usage for <name>
{% endhighlight %}

You'll need version 0.4.2 of the Dreamy gem to use the new functionality. To upgrade your gem, simply run the following:

{% highlight bash %}
jerod@mbp:~$ sudo gem update jerodsanto-dreamy
{% endhighlight %}

That's all for now!


[1]: http://github.com/jerodsanto/dreamy
