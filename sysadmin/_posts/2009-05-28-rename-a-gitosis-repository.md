---
layout: post
published: true
title: "Rename A Gitosis Repository"
excerpt: "I recently needed to rename one of my repositories and couldn't find any info on how to do it, so here is a walk-thru."
---

I use [gitosis][1] for private git repository hosting (and it's awesome). If you are interested, this[ great tutorial][2] will walk you through setting it up yourself.

I recently needed to rename one of my repositories and couldn't find any info on how to do it, so here is a walk-thru. I will demonstrate the steps of renaming a repository called "**tk**" to "**show-time**".


Rename project in gitosis.conf

Before:

{% highlight console %}
[group main]
writable = tk
{% endhighlight %}

After:

{% highlight console %}
[group main]
writable = show-time
{% endhighlight %}

Push changes

{% highlight console %}
git push origin master
{% endhighlight %}

Connect to gitosis server and rename correct folder

{% highlight console %}
cd /home/git/repositories
mv tk show-time
{% endhighlight %}

Change the remote reference in all repository clones

{% highlight console %}
cd /src/show-time
git remote rm origin
git remote add origin git@example-git-server.com:show-time.git
{% endhighlight %}

Done and done.

[1]: http://eagain.net/gitweb/?p=gitosis.git;a=summary
[2]: http://scie.nti.st/2007/11/14/hosting-git-repositories-the-easy-and-secure-way
