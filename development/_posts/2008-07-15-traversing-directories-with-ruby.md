---
layout: post
published: true
title: "Traversing Directories with Ruby"
excerpt: "A few quick tips on traversing directories with Ruby."
---

If you want to shove filenames of all files in a directory into an array, do:

{% highlight ruby %}
# (absolute path)
files = Dir["/Users/jerod/src/**"]
# (relative path)
files = Dir[File.expand_path("~/src") + "/**"]
# (in ENV["PWD"], aka current directory)
files = Dir["**"]
{% endhighlight %}

If you want to shove filenames of all files in a directory **recursively** into an array, do:

{% highlight ruby %}
# (absolute path)
files = Dir["/Users/jerod/src/**/**"]
# (relative path)
files = Dir[File.expand_path("~/src") + "/**/**"]
# (in ENV["PWD"], aka current directory)
files = Dir["**/**"]
{% endhighlight %}

It doesn’t get much easier than that.
