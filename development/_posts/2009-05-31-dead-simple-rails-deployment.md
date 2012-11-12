---
layout: post
published: true
title: "Dead Simple Rails Deployment"
excerpt: "A couple of technologies have come along and made my deployment process a whole lot easier."
---

Deploying a Rails app used to suck. Reverse proxies, Mongrel clusters, Monit, etc. [Capistrano][1] helped out a lot (once you set it up the first time), but all in all the process was still pretty painful.

Thankfully, a couple of technologies have come along and made my deployment process a whole lot easier.

1.  <a href="http://modrails.com/">Passenger</a>
This was the big one. The <a href="http://www.phusion.nl/">Phusion</a> guys' "Hello World" app (as they called it) has really had a positive impact on the Rails community, and me personally. Suddenly my Rails (and Rack) web apps are first class citizens to Apache (and Nginx), which means I can just point a virtual host at the public directory and go. I had almost forgotten how good it feels to just drop some files in a directory and have Apache serve them.

2.  <a href="http://git-scm.com">Git</a>
Ok, so maybe Subversion allows a similar workflow, but for some reason Git is one of those tools that is so much fun to use that it makes me think of <a href="/2009/05/git-informed-when-your-site-is-hacked/">different ways</a> I can use it.

## My Flow

How I deploy these days (when I'm not deploying to [Heroku][2]) is dead simple. I host my private Git repos using [Gitosis][3], but the same would work with [GitHub][4] or any Git server.

## Initial Setup

1. Clone the repository on production server.
2. Create database.yml and any other production-specific configs
3. Configure an Apache virtual host pointing to "public" folder of the repository

## Deploys

**locally:**

{% highlight console %}
jerod@mbp:~$ git push origin master
{% endhighlight %}

**remotely:**

{% highlight console %}
jerod@mbp:~$ git pull origin master && touch tmp/restart.txt
{% endhighlight %}

I know what you're thinking, "Wow, that _is_ dead simple". It's even easier by using Capistrano to execute the remote commands. Here is an example Capistrano task from one of my Rails apps:

{% highlight ruby %}
task :deploy, :roles  => :production do
  system "git push origin master"
  cmd = [ "cd #{root_dir}", "git pull", "touch tmp/restart.txt" ]
  run cmd.join(" && ")
end
{% endhighlight %}

This task can be extended to automatically install required gems, update Git submodules, migrate the database, and so on.

## Other Benefits

Besides the simplicity and ease of deployment in this process, I have also enjoyed the ability to make edits in production and pull them back in to my development environment. And because my production environment has a complete history of code changes, it is trivial to revert commits that cause major problems.

This work flow is by no means a panacea. How do you handle deployment?


[1]: http://www.capify.org/
[2]: /2009/05/3-reasons-why-heroku-is-a-game-changer/
[3]: http://eagain.net/gitweb/?p=gitosis.git;a=summary
[4]: http://github.com
