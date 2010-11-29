---
layout: post
published: true
title: "Just Abort It"
excerpt: "Ruby's `abort` method may be just what you need to print a message and exit."
---

A lot of people end up writing Ruby methods that looks something like this:

{% highlight ruby %}
def stop_error(message)
  puts "ERROR: #{message}"
  exit(1)
end
{% endhighlight %}

Which they call in their app like so:

{% highlight ruby %}
stop_error "Oh noes, file doesn't exist!" unless File.exist?(file)
{% endhighlight %}

I used to write that method a lot too. Did you know Ruby has a built-in method that provides just what we're all looking for?

`Kernel::abort`

So, stop writing your own little method and just abort it:

{% highlight ruby %}
abort "Oh noes, file doesn't exist!" unless File.exist?(file)
{% endhighlight %}
