---
layout: post
published: true
title: "Ruby Rebus Answers"
excerpt: "These are the Ruby Rebus answers you're looking for."
---

Last week I posted [20 Ruby Rebus puzzles][ruby-rebus] promising a follow-up post with the answers. This is that post!

Nobody guessed all 20 (16 was the closest anybody got), so I guess the puzzles were more difficult than I thought. They would've been a little easier had the bonus challenge been revealed, which is that all 20 movies are on [IMDB's top 250][imdb-top-250] list.

Here are the answers, one by one:

### Rebus #1

{% highlight ruby %}
require "active_record"

class Person < ActiveRecord::Base; end
Person.where(sex: "M", age: 78).map(&:country).compact
# => []
{% endhighlight %}

This first rebus is pretty easy, but it did require me to embed the return value to make my point.

**The Answer:** [No Country for Old Men](http://www.imdb.com/title/tt0477348/)

### Rebus #2

{% highlight ruby %}
%w(stand sit walk run him her me you) & %w(put place stand lean them we me us)
{% endhighlight %}

This one is pretty obvious if you just execute the code in IRB.

**The Answer:** [Stand by Me](http://www.imdb.com/title/tt0092005/)

### Rebus #3

{% highlight ruby %}
while true do
  Time.new(1993, 2, 2, 6, 0, 0, "-05:00")
  sleep 86_400
end
{% endhighlight %}

A classic. And, yes. The clock in the movie was reset each morning to the *exact* time in the code above. Time zone and all.

**The Answer:** [Groundhog Day](http://www.imdb.com/title/tt0107048/)

### Rebus #4

{% highlight ruby %}
inside = []
ones = %w(one one one one)
inside << ones.last
{% endhighlight %}

Only one person guessed this one correctly.

**The Answer:** [Let the Right One In](http://www.imdb.com/title/tt1139797/)

### Rebus #5

{% highlight ruby %}
begin
  Class.new { private; def ryan; end }.new.ryan
rescue
end
{% endhighlight %}

Everybody got this one, but it's still one of my favorites of the lot.

**The Answer:** [Saving Private Ryan](http://www.imdb.com/title/tt0120815/)

### Rebus #6

{% highlight ruby %}
def movie(episode)
  case episode
  when 4 then "Guinness"
  when 5 then "Prowse"
  when 6 then "Hamill"
end
{% endhighlight %}

This one was barely missed on a few occasions. People just said "Star Wars". The point of the code is that the method returns a Jedi (or more specifically, an actor who played a Jedi).

**The Answer:** [Star Wars: Episode VI - Return of the Jedi](http://www.imdb.com/title/tt0086190/)

### Rebus #7

{% highlight ruby %}
Batman.new
{% endhighlight %}

Easy, peasy.

**The Answer:** [Batman Begins](http://www.imdb.com/title/tt0372784/)

### Rebus #8

{% highlight ruby %}
require "singleton"

class Parent; end
class Child < Parent; include Singleton; end
ObjectSpace.each_object(::Class).find { |klass| klass < Parent  }.instance
{% endhighlight %}

This one was universally missed or left blank, perhaps because the movie is so old and obscure. The code is also not straight forward. The point is that from the `Parent` class the code returns the singleton instance of its `Child` class. Get it?

**The Answer:** [The Kid](http://www.imdb.com/title/tt0012349/)

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

Another really old movie. Still, a few people got this one. Color me impressed.

**The Answer:** [Anatomy of a Murder](http://www.imdb.com/title/tt0052561/)

### Rebus #10

{% highlight ruby %}
[["Switch", "Dozer", "Mouse"],
 ["Tank", "Cypher", "Apoc"]]
{% endhighlight %}

I really wanted to make this one hard, but I just couldn't figure out how to get that done.

**The Answer:** [The Matrix](http://www.imdb.com/title/tt0133093/)

### Rebus #11

{% highlight ruby %}
"otnemem".reverse
{% endhighlight %}

Another one that you could copy/paste into IRB to derive the answer, if you even need to go that far.

**The Answer:** [Memento](http://www.imdb.com/title/tt0209144/)

### Rebus #12

{% highlight ruby %}
"husband & wife".split(" & ")
{% endhighlight %}

I hadn't heard of this movie despite it being pretty recent (relased in 2011).

**The Answer:** [A Separation](http://www.imdb.com/title/tt1832382/)

### Rebus #13

{% highlight ruby %}
"fish".upcase
{% endhighlight %}

Put this one in the easy pile. It might also be the last good movie that Tim Burton made.

**The Answer:** [Big Fish](http://www.imdb.com/title/tt0319061/)

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

This rebus isn't technically correct because it describes the entirety of both movies instead of just the title, but oh well. It is still pretty easy.

**The Answer:** [Kill Bill](http://www.imdb.com/title/tt0266697/)

### Rebus #15

{% highlight ruby %}
require "timecop"

Timecop.freeze Date.parse("2012-12-21") do
  Time.now
end
{% endhighlight %}

I'm proud of this one mostly because nobody got it. The idea is that you travel to December 21st, 2012 &mdash; famous for the Mayan apocalypse lore &mdash; and then execute `Time.now`. A few people guessed [2012](http://www.imdb.com/title/tt1190080/), which is pretty close but sucks in comparison.

**The Answer:** [Apocalypse Now](http://www.imdb.com/title/tt0078788/)

### Rebus #16

{% highlight ruby %}
class Hash
  alias :movie :fetch
end
{% endhighlight %}

Another one that nobody figured out. Unlike the above, this one was probably missed not for its cleverness, but for its stupidity. The idea is that `fetch` and `snatch` are often used interchangeably, so you can just create an alias one for the other.

Not my best rebus.

**The Answer:** [Snatch](http://www.imdb.com/title/tt0208092/)

### Rebus #17

{% highlight ruby %}
require "rspec"

Fowl.should_receive(:kill).with(2) { nil }
{% endhighlight %}

A fun use of RSpec's test doubles.

**The Answer:** [To Kill a Mockingbird](http://www.imdb.com/title/tt0056592/)

### Rebus #18

{% highlight ruby %}
Process.kill 9, 1988
{% endhighlight %}

Some processes you just can't `kill -15`. Also, the `pid` argument was the year the movie was released.

**The Answer:** [Die Hard](http://www.imdb.com/title/tt0095016/)

### Rebus #19

{% highlight ruby %}
"11:59".gsub(":", ".").to_f.ceil
{% endhighlight %}

The old movies are tough.

**The Answer:** [High Noon](http://www.imdb.com/title/tt0044706/)

### Rebus #20

{% highlight ruby %}
10.times.map { "pennies" }[5]
{% endhighlight %}

Oddly enough I think the `5` threw a few people off. Remember, Ruby's arrays are 0-indexed, so `[5]` gets you the sixth entry.

**The Answer:** [The Sixth Sense](http://www.imdb.com/title/tt0167404/)

### More Rebuses?

Limiting myself to IMDB's top 250 actually made it harder than I thought to come up with good matches for Ruby's syntax and language features. So I may do more of these in the future without a theme holding me back.

Maybe next time I'll come up with a prize so more people participate.

What do you think? Would you like to see more rebuses or do you think they're pretty dorky? Would you be more likely to participate if there were a prize attached?

{% highlight ruby %}
3.times { system 'say "Bueller..."'; sleep 1 }
{% endhighlight %}


[ruby-rebus]:/2012/10/ruby-rebus/
[imdb-top-250]:http://www.imdb.com/chart/top

