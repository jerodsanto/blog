---
layout: post
published: true
title: "The Perfect Setup: Rails on Screen"
excerpt: "This post isn't trying to sell you on <code>screen</code>. There are umpteen sites out there which do that. Instead, I'd like to share with you how I've engineered my setup such that it's a joy to use."
---

If, like me, you prefer staying light on your feet, you probably use a powerful text editor coupled with multiple shell sessions to drive your [Rails][rails] development. Unfortunately, managing said shells _can_ get a bit unwieldy, but thankfully UNIX-based systems have a tool just for the job: [GNU Screen][screen].

This post isn't trying to sell you on `screen`. There are umpteen sites out there which do that. Instead, I'd like to share with you how I've engineered my setup such that it's a joy to use.

![rails screen][railsscreen]

## The Premise

Each Rails project I work on has the same basic needs. I want each of those needs facilitated by a `screen` window, and I don't want to manually bootstrap the environment each time I return to a project. The things I want in each Rails app (currently) are:

1.  TextMate
2.  Autotest
3.  Development server
4.  Development Console
5.  GitX
6.  A spare Bash session

Ideally, I would be able to `cd` to my application's root directory, execute a single command, and be up and running. But...

## The Problem

There is no straight forward way (that I know of) to configure screen for multiple unrelated sessions. In other words, you can configure it to _always_ do certain things when it is invoked, but you can't configure it to _sometimes_ do certain things when it is invoked. WANT.

## My Solution

Good news! Passing the `-c` flag to `screen` specifies a configuration file to use. I leverage this feature to (sometimes) load in a custom, Rails-specific configuration. That plus a wrapper function does the job perfectly. Here's how:

## 1) Create a custom screenrc just for rails

In it I put everything required to get the session all set up. Mine looks like this:

{% highlight console %}
source $HOME/.screenrc

screen 0 bash
title "tests"
stuff "autotest\015"

screen 1 bash
title "server"
stuff "rails server\015"

screen 2 bash
title "console"
stuff "rails console\015"

screen 3 bash
stuff "gitx && mate .\015"
{% endhighlight %}

The first thing to note here is that this file will source my main `.screenrc` file. That means I don't have to repeat any of those settings. Gotta love that!

Next, notice that for each separate window I have 3 lines. The first line indicates which `screen` window it will be in and starts a bash shell, the second line is obviously the title of the window, and the third line is the actual command to "stuff" into the window.

{% aside notice %}
I _could_ bypass the whole "stuff" thing by passing the command directly on the "screen" line instead of passing in "bash", but that will exit the window when the process terminates, which is annoying.
{% endaside %}

Finally, I should explain the `\015` at the end of each "stuff" line. That is telling `screen` to enter a line feed (LF) character which will actually execute the command.

## 2) A screen wrapper function

Now that I have a custom config file, I make it super-simple to invoke `screen` with it by adding this function to my `.bashrc` file:

{% highlight bash %}
function screen() {
  super=`which screen`
  if [ "$1" == "rails" ]; then
    $super -S `basename $PWD` -c $HOME/.screenrailsrc
  else
    $super $@
  fi
}
{% endhighlight %}

This should be pretty self-explanatory. It calls `screen` with the custom config if the first argument is "rails", otherwise it punts.

One noteworthy tidbit is that it also sets the `-S` flag to the name of the directory holding the Rails application. That way if the session ever gets detached I can reattach it with the project name instead of some obscure session id.

## One Stone, Many Birds

I like this system a lot. What is really nice about it is that I can easily extend it to many different scenarios by creating new custom config files and adding matchers to the wrapper function.

Is that perfect or what?

[rails]:http://rubyonrails.org
[screen]:http://www.gnu.org/software/screen/
[railsscreen]:http://jerodsanto.net/drop/rails-screen-20110225-204305.png "Rails on Screen"
