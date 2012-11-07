---
layout: post
published: true
title: "Ruby Rebus"
excerpt: "20 Ruby-based movie title Rebus puzzles. Can you guess them all?!"
---

One of my favorite things on the [Totally Rad Show][trs] is their RADRebus segment. In it, Alex, Dan, and Jeff try to guess movie titles from word/picture puzzles called [rebuses][rebus].

For the uninitiated, I've embedded the first ever RADRebus episode right there &darr;

<iframe width="560" height="315" src="http://www.youtube.com/embed/ra2O5TyW2z8?rel=0" frameborder="0" allowfullscreen></iframe>

I was watching TRS the other day and thought it'd be fun makes some rebuses with Ruby. So I did!

### An Example Rebus

If you don't want to watch the RADRebus video and you don't know what a rebus is, an example may help out.  Here is a movie rebus taken from [Eric Harshbarger's][eric-harshbarger] list of [100 Movie Rebus Puzzles][harshbarger-rebuses].

The puzzle is this:

> chiTROUBLEna

And the answer is [Big Touble in Little China][btlc].

See how that works? Good.

### The Challenge

I have created 20 Ruby-based rebuses representing movie titles. Some are pretty easy, but others I hope will pose a challenge.

See if you can figure out all 20 and post your answers in the comments!

### Rebus #1

{% highlight ruby %}
require "active_record"

class Person < ActiveRecord::Base; end
Person.where(sex: "M", age: 78).map(&:country).compact
# => []
{% endhighlight %}

### Rebus #2

{% highlight ruby %}
%w(stand sit walk run him her me you) & %w(put place stand lean them we me us)
{% endhighlight %}

### Rebus #3

{% highlight ruby %}
while true do
  Time.new(1993, 2, 2, 6, 0, 0, "-05:00")
  sleep 86_400
end
{% endhighlight %}

### Rebus #4

{% highlight ruby %}
inside = []
ones = %w(one one one one)
inside << ones.last
{% endhighlight %}

### Rebus #5

{% highlight ruby %}
begin
  Class.new { private; def ryan; end }.new.ryan
rescue
end
{% endhighlight %}

### Rebus #6

{% highlight ruby %}
def movie(episode)
  case episode
  when 4 then "Guinness"
  when 5 then "Prowse"
  when 6 then "Hamill"
end
{% endhighlight %}

### Rebus #7

{% highlight ruby %}
Batman.new
{% endhighlight %}

### Rebus #8

{% highlight ruby %}
require "singleton"

class Parent; end
class Child < Parent; include Singleton; end
ObjectSpace.each_object(::Class).find { |klass| klass < Parent  }.instance
{% endhighlight %}

### Rebus #9

{% highlight ruby %}
class Murder
  def self.inspect
    [ methods,
      instance_methods,
      ancestors
    ].join(", ")
  end
end

Murder.inspect
{% endhighlight %}

### Rebus #10

{% highlight ruby %}
[["Switch", "Dozer", "Mouse"],
 ["Tank", "Cypher", "Apoc"]]
{% endhighlight %}

### Rebus #11

{% highlight ruby %}
"otnemem".reverse
{% endhighlight %}

### Rebus #12

{% highlight ruby %}
"husband & wife".split(" & ")
{% endhighlight %}

### Rebus #13

{% highlight ruby %}
"fish".upcase
{% endhighlight %}

### Rebus #14

{% highlight ruby %}
{
  lucy: "Ishii",
  vivica: "Green",
  daryl: "Driver",
  michael: "Budd",
  david: "Bill"
}.clear
{% endhighlight %}

### Rebus #15

{% highlight ruby %}
require "timecop"

Timecop.freeze Date.parse("2012-12-21") do
  Time.now
end
{% endhighlight %}

### Rebus #16

{% highlight ruby %}
class Hash
  alias :movie :fetch
end
{% endhighlight %}

### Rebus #17

{% highlight ruby %}
require "rspec"

Fowl.should_receive(:kill).with(2) { nil }
{% endhighlight %}

### Rebus #18

{% highlight ruby %}
Process.kill 9, 1988
{% endhighlight %}

### Rebus #19

{% highlight ruby %}
"11:59".gsub(":", ".").to_f.ceil
{% endhighlight %}

### Rebus #20

{% highlight ruby %}
10.times.map { "pennies" }[5]
{% endhighlight %}

### Bonus Challenge!

All of the movies in this list have a common bond. Can you figure out what it is?

(tip: if you can figure out the bonus question early on may will help you get the more difficult rebuses.)

### The Answers

I will reveal the answers to all 20 rebuses and the bonus challenge in a follow-up post.

Be sure to grab the [RSS][rss], follow along on [Twitter][twitter-jerod], or bookmark this page so you don't miss the BIG reveal! ;)

[trs]:http://revision3.com/trs
[btlc]:http://www.imdb.com/title/tt0090728/
[rebus]:http://en.wikipedia.org/wiki/Rebus
[eric-harshbarger]:http://www.ericharshbarger.org/
[harshbarger-rebuses]:http://www.ericharshbarger.org/epp/2006/fall/movie_rebuses_100.pdf
[rss]:http://feeds.feedburner.com/nomeanblog
[twitter-jerod]:https://twitter.com/jerodsanto
