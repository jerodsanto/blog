---
layout: post
published: true
title: "Ad Hoc Command-Line Notifications with Twitter"
excerpt: "Have you ever spent way too much time babysitting a long-running command? Code compilation, large file transfers, software upgrades and other time consuming tasks can trash productivity by requiring intermittent attention. Here is a way to avoid the predicament."
---

Have you ever spent way too much time babysitting a long-running command? Code compilation, large file transfers, software upgrades and other time consuming tasks can trash productivity by requiring intermittent attention.

I have a novel idea; **let's not do that anymore!**

There are undoubtedly dozens of solutions for this little problem, but I chose Ruby + Twitter for a few reasons:

* I like Ruby
* I like Twitter
* I want hassle-free SMS
* I want portability (small client-side configuration)

So, with those things in mind, here is what I've come up with:


### 1) A Special Twitter Account

Create a new account for your notifications. You'll most likely want to protect its tweets unless you don't mind _just about anybody_ seeing all the notifications you're sending to yourself. Once the account is set up, follow it from your main Twitter account and enable SMS notifications for its tweets.

<img class="aligncenter size-full wp-image-767" title="twitter-sms" src="http://blog.jerodsanto.net/wp-content/uploads/2009/11/twitter-sms.png" height="136" alt="twitter-sms" width="532" />

### 2) A dead simple Ruby script

I've written about John Nunemaker's Twitter gem a [couple][1] of [times][2], and it once again makes its way into the toolbelt. Install if you don't have it:

{% highlight console %}
jerod@mbp:~$ sudo gem install twitter
{% endhighlight %}

This gem makes the notification script just a few lines of code:

{% highlight ruby %}
#!/usr/bin/env ruby
require 'rubygems'
require 'twitter'

abort %|Usage: #{File.basename(__FILE__)} "your message"| unless ARGV.length == 1
user = "your_username"
pass = "your_password"
Twitter::Base.new(Twitter::HTTPAuth.new(user,pass)).update("NOTICE: #{ARGV.first}")
{% endhighlight %}

You can name the script anything you like. I call it `twitter_notify`. Make it executable and ensure it is in your shell's execution path (I symlink it so I can keep my code organized):

{% highlight console %}
jerod@mbp:~$ chmod +x src/ruby/twitter/twitter_notify.rb
jerod@mbp:~$ ln -s ~/src/ruby/twitter/twitter_notify.rb /usr/local/bin/twitter_notify
{% endhighlight %}

### 3) A Call to Notify

Anytime you want to be notified that a command has completed, just follow it with the `twitter_notify` command. There are a couple of ways to do this, and they are slightly different:

{% highlight console %}
jerod@mbp:~$ cp /tmp/bigfile.tgz /somewhere/else && twitter_notify "all done copying!"
{% endhighlight %}

Or:

{% highlight console %}
jerod@mbp:~$ cp /tmp/bigfile.tgz /somewhere/else; twitter_notify "command complete!"
{% endhighlight %}

Using `&&` will only call the second command if the first command completed successfully. Using `;` will call the second command regardless of how the first command completed. Adjust usage depending on your circumstance.

### 4) A Deserved Break

Now that you've set up your tools to handle the grunt work, walk away from the computer! Go outside, watch a movie, hang with your fam, who cares! When that task is complete you'll get an SMS and you can deal with it then.

That's all I got.


[1]: /2009/05/expand-your-twitter-network-in-less-than-15-lines-of-ruby/
[2]: /2009/05/see-which-twitterers-dont-follow-youback-in-less-than-15-lines-of-ruby/
