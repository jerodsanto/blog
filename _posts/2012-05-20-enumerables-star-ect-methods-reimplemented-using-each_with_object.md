---
layout: post
published: true
title: "Enumerable's *ect Methods Reimplemented Using `each_with_object`"
excerpt: "On episode 54 of the Ruby Rogues podcast, Josh Susser mentioned an interview question he used to use where he would ask the interviewee to reimplement Enumerable's *ect methods (collect, select, reject, and detect) using <code>inject</code>. In this post I attempt the same thing, but using <code>each_with_object</code>"
---

On episode [54][rr54] of the Ruby Rogues podcast, [Josh Susser][susser] mentioned an interview question he used to use where he would ask interviewees to reimplement [Enumerable's][enumerable] *ect methods (`collect`, `select`, `reject`, and `detect`) using `inject`.

On the same show, [James Edward Gray][jeg2] aptly pointed out that Ruby 1.9 has a new method that works a lot like `inject`, but has a more meaningul name and removes the need to expliticly return the passed object during each pass: [`each_with_object`][each-with-object].

I thought it'd be a fun exercise to give Josh's interview question a go, but using `each_with_object` instead of `inject`.

### Tests First

We'll be monkey patching the Enumerable module, but first let's get some tests in place so we know if our overrides actually work. Here's a quick test suite, which could definitely be more thorough, but oh well this is just for fun anyhow:

{% highlight ruby %}
require "minitest/autorun"

class StarEctTest < MiniTest::Unit::TestCase
  def setup
    @array = [1, 2, 3, 4, 5]
  end

  def test_collect
    assert_equal [2, 4, 6, 8, 10], @array.collect { |i| i * 2 }
  end

  def test_detect
    assert_equal 3, @array.detect { |i| i > 2 }
    assert_nil @array.detect { |i| i < 0 }
  end

  def test_select
    assert_equal [1, 2], @array.select { |i| i < 3 }
    assert_equal [],  @array.select { |i| i < 0 }
  end

  def test_reject
    assert_equal [3, 4, 5], @array.reject { |i| i < 3 }
    assert_equal [], @array.reject { |i| i > 0 }
  end
end
{% endhighlight %}

At this point we're just testing Ruby's imlpementation so it's no surprise that they're all green. Now we'll re-open the Enumerable module and define our methods inside.

My full source code is [here][source], in case you want to follow along at home.

### Collect

[`collect`][collect] invokes the given block on each item and returns a new array with the results. If you've never heard of `collect`, you may know it as `map`. Implementing it using `each_with_object` is pretty trivial. You just pass in an array and push processed items on to it.

{% highlight ruby %}
def collect(&block)
  each_with_object([]) { |i, obj| obj << block.call(i) }
end
{% endhighlight %}

### Select

[`select`][select] returns a new array holding just the items for which the given block returned `true`. This one is also pretty easy.

{% highlight ruby %}
def select(&block)
  each_with_object([]) { |i, obj| obj << i if block.call(i) }
end
{% endhighlight %}

### Reject

[`reject`][reject] is just like `select`, only the opposite: it returns a new array holding only the items for which the given block returned `false`.

{% highlight ruby %}
def reject(&block)
  each_with_object([]) { |i, obj| obj << i unless block.call(i) }
end
{% endhighlight %}

### Detect

Here's where it gets tricky. [`detect`][detect] (a.k.a `find`) returns the first item for which the given block return true. If no items fit the bill, it returns `nil`. Easy, right? Just pass `nil` into `each_with_object` and set it to an item when applicable:

{% highlight ruby %}
def detect(&block)
  each_with_object(nil) { |i, obj| obj ||= block.call(i) ? i : nil }
end
{% endhighlight %}

I expected that to work, but sadly it does not. It turns out that you can't mutate `nil` using `each_with_object`. That actually makes sense, because you can't normally assign to nil, but it sure isn't very useful. No matter what you do inside the block, it just returns `nil`.

So for this particular method, I reverted to `inject`, which does allow you to pass `nil` into it and come out with something else:

{% highlight ruby %}
def detect(&block)
  inject(nil) { |obj, i| obj ||= block.call(i) ? i : nil; obj }
end
{% endhighlight %}

So that works, but it feels a bit like a fail. If you can think of a way to implement `detect` using `each_with_object`, please do let me know.

### Takeaways

Putting yourself through these little challenges &mdash; no matter how silly they seem &mdash; is a great way to level up your skills. This was fun and I learned a little something along the way.

Plus, if I ever want to work for/with Josh, I'll be ready for at least one of his questions ;)

([source code][source])

[susser]:http://twitter.com/joshsusser
[jeg2]:http://twitter.com/jeg2
[rr54]:http://rubyrogues.com/054-rr-coding-exercises-quizzes-and-katas/
[each-with-object]:http://ruby-doc.org/core-1.9.3/Enumerable.html#method-i-each_with_object
[enumerable]:http://ruby-doc.org/core-1.9.3/Enumerable.html
[inject]:http://ruby-doc.org/core-1.9.3/Enumerable.html#method-i-inject
[collect]:http://ruby-doc.org/core-1.9.3/Enumerable.html#method-i-collect
[select]:http://ruby-doc.org/core-1.9.3/Enumerable.html#method-i-select
[reject]:http://ruby-doc.org/core-1.9.3/Enumerable.html#method-i-reject
[detect]:http://ruby-doc.org/core-1.9.3/Enumerable.html#method-i-detect
[source]:https://gist.github.com/2759931
