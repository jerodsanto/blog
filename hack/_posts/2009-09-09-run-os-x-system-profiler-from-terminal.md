---
layout: post
published: true
title: "Run OS X System Profiler From Terminal"
excerpt: "OS X's built-in `System Profiler` provides a great graphical display of pretty much anything you'll want to know about your Mac."
---

OS X's built-in `System Profiler` provides a great graphical display of pretty much anything you'll want to know about your Mac.

<img class="aligncenter size-full wp-image-664" title="profiler" src="http://blog.jerodsanto.net/wp-content/uploads/2009/09/profiler.png" height="216" alt="profiler" width="640" />

That's cool and all, but what if you want to access that information programmatically? Turns out you can also run the **_System Profiler_** from the terminal by executing this command:

{% highlight console %}
jerod@mbp:~$ /usr/sbin/system_profiler
{% endhighlight %}

What's great about this access method is that it allows you to slurp that data into any other program and have your way with it! For instance, I wanted to track my <a href="http://twitter.com/jerodsanto/status/3780056282" rel="external">new battery's</a> cycle count and charge capacity over time. Why? I dunno, because I'm a geek, okay, get off my back!... Anyways, with the **_system_profiler_** command I simply run this little Ruby script every day:

{% highlight ruby %}
require 'date'

data      = `/usr/sbin/system_profiler SPPowerDataType`
cycles    = data[/Cycle count: (\d+)/, 1]
condition = data[/Condition: (\w+)/, 1]
capacity  = data[/Full charge capacity \(mAh\): (\d+)/, 1]

File.open('/Users/jerod/Documents/battery_history.csv', "a") do |file|
  file.puts "#{Date.today},#{cycles},#{capacity},#{condition}"
end
{% endhighlight %}

Ruby uses the (possibly familiar) backticks to capture output from a shell command. All that was left for me to do was to parse the raw data and save it to a CSV file.

Finally, note that the my script is passing `SPPowerDataType` as an argument which narrows down the returned results. You can learn more about how to use the `system_profiler` command by readings its manual. Just:

{% highlight console %}
jerod@mbp:~$ man system_profiler
{% endhighlight %}
