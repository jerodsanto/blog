---
layout: post
published: true
title: "List all Git commits that are on one branch, but aren't on the other"
excerpt: "This is super handy for Heroku-style deploys"
---

Common need: show me all the comits that branch `X` has, but branch `Y` doesn't.

Why is this need common? Because Heroku-style deployment environments are increasingly common and it's super handy to quickly see which commits you haven't pushed to production.

Here is the Git command in all its glory

{% highlight console %}
git log --left-right --graph --cherry-pick --oneline X...Y
{% endhighlight %}

Hopefully obvious, but worth a mention: replace `X` and `Y` above with the names of the branches you want to compare.

This is nice, but that doesn't mean we have to memorize it. Aliases to the rescue! Add the following to your `.gitconfig`:

{% highlight console %}
[alias]
  compare = log --left-right --graph --cherry-pick --oneline
{% endhighlight %}

Now if you want to see the commits on your master branch that aren't on Heroku's master branch:

{% highlight console %}
git compare master...heroku/master
{% endhighlight %}

Admittedly, `compare` is a pretty generic name for this alias. Naming things is [hard](2014/08/naming-things-is-hard-lets-go-shopping/). Let me know if you have a better one!
