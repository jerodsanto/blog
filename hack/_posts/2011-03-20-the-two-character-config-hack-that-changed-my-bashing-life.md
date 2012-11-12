---
layout: post
published: true
title: "The Two Character Config Hack That Changed my Bashing Life"
excerpt: "Little conveniences can make big differences. I recently added two characters to my Bash configuration that made a profound affect on my everyday computer use."
---

Code isn't the only thing we should endeavor to keep [DRY][dry]. Let's see if you can detect a pattern in this very common &mdash; albeit contrived for sake of example &mdash; Bash session:

{% highlight console %}
jerod@mbp:~$ cd src/erlang
jerod@mbp:~/src/erlang$ ls
[snip]
jerod@mbp:~/src/erlang$ cd ..
jerod@mbp:~/src$ ls
[snip]
jerod@mbp:~/src$ cd
jerod@mbp:~$ ls
[snip]
{% endhighlight %}

In my experience, the `cd` command is _almost always_ followed by the `ls` command. Why have I been typing it in all these years? Not anymore, baby!

I already have a custom `cd` function which provides `cd ...` type directory traversals ([more on that here][cdupupup]), so I recently added two characters to it.

## Before

{% highlight bash %}
function cd () {
  if [[ $# > 0 ]]; then
    if [ ${1:0:2} == ".." ]; then
      rest=${1:2}
      rest=${rest//./../}
      builtin cd "${1:0:2}/${rest}"
    else
      builtin cd "$1"
    fi
  else
    builtin cd
  fi
}
{% endhighlight %}

## After

{% highlight bash %}
function cd () {
  if [[ $# > 0 ]]; then
    if [ ${1:0:2} == ".." ]; then
      rest=${1:2}
      rest=${rest//./../}
      builtin cd "${1:0:2}/${rest}"
    else
      builtin cd "$1"
    fi
  else
    builtin cd
  fi
  ls
}
{% endhighlight %}

Did you spot the change? Yup, I just added the `ls` at the end of every `cd`. Little change, huge payoff. Give it a try and after a few days you'll be wondering why you didn't do this years ago (I know I am).

Oh, and if you don't want the directory traversal bit, you can get away with a much more simple function:

{% highlight bash %}
function cd() { builtin cd $@ && ls; }
{% endhighlight %}

Enjoy!

[dry]:http://en.wikipedia.org/wiki/Don't_repeat_yourself
[bash]:http://en.wikipedia.org/wiki/Bash_shell
[cdupupup]:http://blog.jerodsanto.net/2009/09/cd-up-up-up/
