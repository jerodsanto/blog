---
layout: post
published: true
title: "An Algorithm to Reliably Identify Nested Substrings"
excerpt: "Regular expressions are great for matching many patterns, but they often fall down when dealing with recursive matching. In these cases, there is a simple algorithm that you can use which is more reliable than regular expressions."
---

Regular expressions are great for matching many patterns, but they are usually not ideal when matching nested structures (recursive matching).

*Most* regular expression engines can handle a known level of recursion and *some* engines can even handle arbitrary recursion, but the required expressions are often quite complex, which makes them difficult to read, modify, and extend.

Instead, you can use this simple algorithm to identify nested substrings.

## The Algorithm

Traverse the string's characters one by one, applying the following logic:

* When a **start delimiter** is met and there is not already a **start index**, mark its index and increment the **depth counter**
* When a **start delimiter** is met and there is already a **start index**, just increment the **depth counter**
* When an **end delimiter** is met and the **start index** isn't marked, do nothing
* When an **end delimiter** is met and the **start index** is marked, decrement the **depth counter**
* When an **end delimiter** is met, the **start index** is marked, and the **depth counter** is 0, store current **start index** and **end index**, then reset both indexes

The result is a series of start/end position tuples which are used to identify and return the nested substrings. How about an example?

## An Example

Let's say that you want to take a string of text and remove any asides in it. An aside is defined as any text inside parantheses. Asides can be nested inside one another, but the goal is to remove them all.

So, this string of text:

> ohai there (friend), do we (that's the royal we (duh!)) know what's up?

Would need to match:

> (friend)

and

> (that's the royal we (duh!))

Additionally, this string of text:

> Well, 1) we should go to the store (grocery (not Hy-Vee)), and 2) we should buy stuff

Would need to match:

> (grocery (not Hy-Vee))

Finally, this string of text:

> This is, literally, an improper use of "literally". Or is it?

Would need to not match anything. Let's implement the algorithm in Ruby. We'll call the method `asides`.

## A Ruby Implementation

First, we turn the spec above into executable RSpec code:

{% highlight ruby %}
describe "asides" do
  it "matches multiple, nested substrings" do
    matches = asides "ohai there (friend), do we (that's the royal we (duh!)) know what's up?"
    matches.first.should == "(friend)"
    matches.last.should == "(that's the royal we (duh!))"
  end

  it "does not match partial substrings" do
    matches = asides "Well, 1) we should go to the store (grocery (not Hy-Vee)), and 2) we should buy stuff"
    matches.first.should == "(grocery (not Hy-Vee))"
    matches.size.should == 1
  end

  it "has no matches when there are no substrings" do
    matches = asides "This is, literally, an improper use of 'literally'. Or is it?"
    matches.size.should == 0
  end
end
{% endhighlight %}

Next, we write the `asides` method, which implements the algorithm above, to make all three of these tests pass:

{% highlight ruby %}
def asides(text, start_delimiter="(", end_delimiter=")")
  depth = index = 0
  asides = []

  while index < text.length
    char = text[index]

    if char == start_delimiter
      start ||= index
      depth += 1
    elsif char == end_delimiter && start
      depth -= 1

      if depth == 0
        asides << text[start..index]
        start = nil
      end
    end

    index += 1
  end

  asides
end
{% endhighlight %}

## Using The Method

Now that the `asides` method is returning a list of substrings, we just need to loop over them and remove them from the original text. This will achieve our original goal of removing all asides. Let's spec and write a `sans_asides` method to do just that:

{% highlight ruby %}
describe "sans_asides" do
  let(:desired_text) { "well isn't that neat?" }

  it "creates a string with all asides removed from the original" do
    text = "well (now) isn't that neat (if I do say so myself (and I do))?"
    sans_asides(text).should == desired_text
  end

  it "creates an identical string when original string has no asides" do
    sans_asides(desired_text).should == desired_text
  end
end
{% endhighlight %}

And the implementation:

{% highlight ruby %}
def sans_asides(text)
  asides(text).each { |aside| text.gsub! /\s?#{Regexp.quote(aside)}/, "" }
  text
end
{% endhighlight %}

Two things to note in this code:

1. We're using the returned asides in a regular expression to also remove any leading whitespaces
2. We use `Regexp.quote` so that any special characters in the aside are properly escaped

## Other Solutions

I think this mehod of nested substring identification is pretty solid. It is relatively easy to read and it decouples the identification step from the manipulation step.

But surely there are other (better?) ways to skin this cat. How would you tackle it?
