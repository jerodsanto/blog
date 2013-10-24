---
layout: post
published: true
title: "Ruby Quick Tip: Easily Count Occurrences of Array Elements"
excerpt: "Have you ever needed to see how many times each element in an array occurs? Perhaps sort by those occurrences? Here's a quick and easy way to do it."
---

Have you ever needed to see how many times each element occurs in an array? Perhaps sort the elements by occurrence? Using an awesome feature of `Hash.new` makes this task quick and easy.

`Hash.new` takes an argument that will be returned when a key that doesn't correspond to a hash entry is accessed. Basically, a default value for all hash keys.

With that knowledge in hand, we can take our array of elements and easily get occurrence counts for each unique element. We just need to initialize each key to 0 and then increment the count each time the element appears.

Let's trump up an array of words, shall we?

{% highlight ruby %}
words = %w(how much wood would a wood chuck chuck)
{% endhighlight %}

Good enough. Now, we want to know how many times each word occurs:

{% highlight ruby %}
counts = Hash.new 0

words.each do |word|
  counts[word] += 1
end

# {"how"=>1, "much"=>1, "wood"=>2, "could"=>1, "a"=>1, "chuck"=>2}
{% endhighlight %}

Isn't that easy? Here's a bonus tip. If we use `each_with_object` we can turn that baby into a one-liner:

{% highlight ruby %}
words.each_with_object(Hash.new(0)) { |word,counts| counts[word] += 1 }

# {"how"=>1, "much"=>1, "wood"=>2, "could"=>1, "a"=>1, "chuck"=>2}
{% endhighlight %}

From this point sorting or filtering our elements by occurrence count should be a breeze. Enjoy!
