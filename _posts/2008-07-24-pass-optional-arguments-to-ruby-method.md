---
layout: post
published: true
title: "Pass Optional Arguments to Ruby Method"
excerpt: "Ruby makes it super-simple to pass optional arguments with default values."
---

This is the _Ruby way_ of passing optional arguments with default values into a method:

{% highlight ruby %}
def awesomeness options = {}
  #sensible defaults
  opts = {
   :name   => "Jerod",
   :handle => "sant0sk1",
   :blog   => "Standard Deviations"
  }.merge options

  opts.each { |key,value| puts "#{key} = #{value}" }
end
{% endhighlight %}

When called sans arguments this function will print the following:

{% highlight ruby %}
awesomeness
handle = sant0sk1
name = Jerod
blog = Standard Deviations
{% endhighlight %}

When called with arguments this function will merge them into the opts variable and print the following:

{% highlight ruby %}
awesomeness :name => "Santo"
handle = sant0sk1
name = Santo
blog = Standard Deviations
{% endhighlight %}

The defaults are used unless you specify an override in the method call, in which case the override is merged into the opts hash.
