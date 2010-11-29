---
layout: post
published: true
title: "Managing Broken Symlinks"
excerpt: "I just added two new functions to my bashrc which make it super-simple to find & remove broken symbolic links on your system."
---

I just added two new functions to my [bashrc][1] which make it super-simple to find & remove broken symbolic links on your system.

They're simple wrappers around the ever-useful "find" utility:

{% highlight bash %}
function find_broken_symlinks() { find -x -L "${1-.}" -type l; }
function rm_broken_symlinks() { find -x -L "${1-.}" -type l -exec rm {} +; }
{% endhighlight %}

You can call the functions with a specific path:

{% highlight console %}
jerod@mbp:~$ find_broken_symlinks /usr/local/bin
{% endhighlight %}

Or you can call them sans argument to search your current working directory:

{% highlight console %}
jerod@mbp:~$ find_broken_symlinks
{% endhighlight %}

Enjoy!

[1]:http://github.com/sant0sk1/dotfiles/blob/master/bashrc
