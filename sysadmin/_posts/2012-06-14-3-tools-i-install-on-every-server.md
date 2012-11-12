---
layout: post
published: true
title: "3 Tools I Install on Every Server"
excerpt: "htop, ack, and tree"
---

Over the years, I've found a few tools so invaluable for managing *nix servers that I end up installing them on every machine under my employ.

They are, in no particular order:

## htop

`htop` is what `top` looks like after she puts on her dancing shoes on a Friday night. Basically `htop` turns this:

![top]

into this:

![htop][htop]

It's such an improvement over plain ole' `top` &mdash; with no known downsides &mdash; that I have an alias in my shell:

{% highlight bash %}
if [[ -x `which htop` ]]; then alias top="htop"; fi
{% endhighlight %}

To install `htop` from repos:

{% highlight bash %}
# Debian
$ aptitude install htop
# Arch
$ pacman -S htop
# OS X
brew install htop-osx
{% endhighlight %}

## ack

`ack` is a text search tool akin to `grep`, but with some pretty distinct advantages:

* fast &mdash; it only searches what makes sense to search
* defaults to recursive searches
* defaults to colored output
* defaults to show line numbers of matched strings
* takes fewer keystrokes
* uses Perl's powerful regular expressions

Needless to say, it's [better than grep][betterthangrep].

To install `ack` from repos:

{% highlight bash %}
# Debian
$ aptitude install ack-grep
$ ln -s /usr/bin/ack-grep /usr/bin/ack
# Arch
$ pacman -S ack
# OS X
$ brew install ack
{% endhighlight %}

## tree

`tree` is a great way to wrap your head around a directory structure instead of `cd`ing and `ls`ing all over the place.

`tree`'s output looks like this:

![tree][tree]

The output can be a bit overwhelming for directories with many files and subdirectories, but it can be easily piped to `less` so you can page and navigate it.

To install `tree` from repos:

{% highlight bash %}
# Debian
$ aptitude install tree
# Arch
$ pacman -S tree
# OS X
$ brew install tree
{% endhighlight %}

## quid pro quo

What about you?

Do you have any tools that don't ship with your server operating system of choice, but you just can't live without?

If so, I probably can't live without them either and just don't know it yet. Please share :)

[top]:http://jerodsanto.net/drop/top-20120614-160039.png
[htop]:http://jerodsanto.net/drop/htop-20120614-155945.png
[betterthangrep]:http://betterthangrep.com/
[tree]:http://jerodsanto.net/drop/tree-20120614-161039.png
