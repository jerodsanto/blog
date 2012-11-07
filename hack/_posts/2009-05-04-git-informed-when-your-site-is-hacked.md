---
layout: post
published: true
title: "Git Informed When Your Site Is Hacked"
excerpt: "How to set up git as a change notification mechanism"
---

Good security require [defense in depth][1]. The more security layers you add, the harder it is to subvert them all. Here is a reactionary layer you can add to your security practices.

The only thing worse than getting hacked is getting hacked and not knowing it (or worse yet, having one of your clients inform you). Often times an attacker needs to add and/or change files on your site to accomplish their goal. Wouldn't it be nice if something could inform you of unauthorized changes? Enter [Git][2].

I will demonstrate using Git for change notification on a WordPress install using Ruby, but you can apply this principle in many scenarios (hmm, /etc...?).

~

**1) ignore folders/directories of no interest**

We don't want Git to track every file in the directory, so we'll tell it which ones to ignore. Common choices are temporary directories, log files, and any file or directory that gets update frequently. Create a file called .gitignore in your site's root directory. List the stuff for Git to ignore in it. It should look something like this:

{% highlight bash %}
wp-content/cache/*
wp-content/uploads/*
{% endhighlight %}

**2) create new Git repository, add all files and execute first commit**

{% highlight bash %}
git init
git add .
git commit -a -m "Initial Commit"
{% endhighlight %}

Now you're set.

**3) download & customize script**

Git alone won't check itself and email you. For this, we'll need help of a scripting language. I wrote this little script in Ruby, but the same could be accomplished in Bash, Python, or whatever suits your fancy. You can write your own or download and customize the one I use:

{% highlight bash %}
wget http://jerodsanto.net/src/ruby/git_watch.rb
chmod +x git_watch.rb
{% endhighlight %}

The key to the script is where it shells out and runs the 'git status' command. If there have been changes to the repository that were not properly committed, 'git status' will not return "working directory clean". The check is simple:

{% highlight ruby %}
result = `git status`
unless result =~ /working directory clean/
  # set up email
  send_email SEND_TO, :body  => message
end
{% endhighlight %}

You'll need to edit this file and change the `SEND_TO` variable to your email address. You can also customize the email that is sent by modifying the `send_email` function near the top.

**4) schedule script execution**

Now, lets make this script check the blog for changes once every hour. Edit your user's cron configuration and add a line similar to this:

{% highlight bash %}
0 * * * * /scripts/git_watch.rb /var/www/mysite/wordpress
{% endhighlight %}

I put all my custom scripts in a `/scripts` directory on every server I administer. That way I always know where to look no matter what server I'm currently on. The script takes one argument, the directory to check for changes. Adjust your cron for your script and site locations.

But what about authorized changes? Simple. Commit them using Git and they won't be triggered on.

For example, you install a new plugin to your blog and you don't want your git_watch script to email you about it:

{% highlight bash %}
git add wp-content/plugins/github-widget/
git commit -a -m "installed github widget plugin"
{% endhighlight %}

The added bonus of this technique is you are creating a verifiable changelog of your site over time, complete with notes! An example from one of my sites:

{% highlight bash %}
git log

commit 109d30026118de089297a4d7fa56babff3677bdc
Author: Jerod Santo <jerod.santo@gmail.com>
Date:   Sat May 2 07:55:08 2009 -0700

    fixed bad php4 install and upgraded wp-cache

commit edc1e89c2cbf38ae1373f6b5cf03d29942399fd8
Author: Jerod Santo <jerod.santo@gmail.com>
Date:   Fri Apr 10 06:25:31 2009 -0700

    ignore sitemap changes
{% endhighlight %}

Plus, it is easy to trace the attacker's steps if you do get compromised because you can see which files have been changed and what has been done to them (using the `git diff` command). Once you diagnose the problem, you can simply revert to an old commit before the attack (you're still vulnerable at this point, but at least your site is clean until you can patch it).

Enjoy!


[1]: http://en.wikipedia.org/wiki/Defense_in_Depth_(computing)
[2]: http://git-scm.com/
