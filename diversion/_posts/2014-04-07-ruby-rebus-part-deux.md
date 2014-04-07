---
layout: post
published: true
title: "Ruby Rebus! Part Deux"
excerpt: "15 Ruby-based movie title Rebus puzzles. Can you guess them all?!"
---

It's been ~18 months since my [first Ruby Rebus challenge][ruby-rebus] and, frankly, that's just too long to ask y'alls nerds to wait. Wait no more! I've dreamt up 15 brand spankin' new rebuses[^1] for your guessing pleasure.

Last round I only picked movies from IMDB's [Top 250][imdb-top-250] list. This time the tie theat binds these movies is that I've seen them *and* I like them.

The other big change this time around is **instant gratification**. Instead of a follow-up post with the answers, just click the button under each rebus once you've figured it out (or given up)! Enough intro,

## Rebus #1

{% highlight ruby %}
throw :me if person.is_a? ConMan
{% endhighlight %}

{% reveal %}
[![Catch Me If You can](http://jerodsanto.net/drop/cmiyc.jpg)](http://www.imdb.com/title/tt0264464/)
{% endreveal %}

## Rebus #2

{% highlight ruby %}
expect(Game).to receive(:play)
{% endhighlight %}

{% reveal %}
[![Spy Game](http://jerodsanto.net/drop/spy-game.jpg)](http://www.imdb.com/title/tt0266987/)

Gotta pull out your RSpec to solve this one.
{% endreveal %}

## Rebus #3

{% highlight ruby %}
[].method :each
{% endhighlight %}

{% reveal %}
[![Looper](http://jerodsanto.net/drop/looper.jpg)](http://www.imdb.com/title/tt1276104/)

If you were thinking `The Enumerator`, you may have just stumbled upon Schwarzenegger's next flick...

{% endreveal %}

## Rebus #4

{% highlight ruby %}
"CATCGTAATGACGGCCT".dup
{% endhighlight %}

{% reveal %}
[![Gattaca](http://jerodsanto.net/drop/gattaca.jpg)](http://www.imdb.com/title/tt0119177/)

This one would be better if you couldn't practically see the name in the string.
{% endreveal %}

## Rebus #5

{% highlight ruby %}
[NoMethodError, NameError]
{% endhighlight %}

{% reveal %}
[![The Usual Suspects](http://jerodsanto.net/drop/usual-suspects.jpg)](http://www.imdb.com/title/tt0114814/)

Is it just me or do `NoMethodError` and `NameError` account for 95% of all errors?
{% endreveal %}

## Rebus #6

{% highlight ruby %}
[Float.instance_method(:ceil), Float.instance_method(:floor)]
{% endhighlight %}

{% reveal %}
[![Rounders](http://jerodsanto.net/drop/rounders.jpg)](http://www.imdb.com/title/tt0128442/)

At first I included the `round` method, but thought that'd be too easy.
{% endreveal %}

## Rebus #7

{% highlight ruby %}
Actor = Struct.new :movie, :first_name
Actor.new "Argo", "John"
Actor.new "Monsters, Inc.", "John"
Actor.new "The Big Lebowski", "John"
{% endhighlight %}

{% reveal %}
[![A Few Good Men](http://jerodsanto.net/drop/fgm.jpg)](http://www.imdb.com/title/tt0104257/)

It's a few John Goodman movies. A few Goodman. Get it?!
{% endreveal %}

## Rebus #8

{% highlight ruby %}
class Payment
  delegate :give, to: :other
end
{% endhighlight %}

{% reveal %}
[![Pay it Forward](http://jerodsanto.net/drop/pif.jpg)](http://www.imdb.com/title/tt0223897/)

This code requires Rails to actually execute, but hopefully it will never actually execute.
{% endreveal %}

## Rebus #9

{% highlight ruby %}
class Object
  def initialize
    @afraid = true
  end
end
{% endhighlight %}

{% reveal %}
[![Primal Fear](http://jerodsanto.net/drop/primal-fear.jpg)](http://www.imdb.com/title/tt0117381/)

`Object` is Ruby's primordial ooze.
{% endreveal %}

## Rebus #10

{% highlight ruby %}
%i(stop danger yield detour)
{% endhighlight %}

{% reveal %}
[![Signs](http://jerodsanto.net/drop/signs.jpg)](http://www.imdb.com/title/tt0286106/)

Symbols. Signs. You see what I did there.
{% endreveal %}

## Rebus #11

{% highlight ruby %}
if s == "AZ"
  raise
end
{% endhighlight %}

{% reveal %}
[![Raising Arizona](http://jerodsanto.net/drop/raising-arizona.jpg)](http://www.imdb.com/title/tt0093822/)

The challenge here was having something represent Arizona without being obvious. I may have failed at that.
{% endreveal %}

## Rebus #12

{% highlight ruby %}
60.times { sleep 1 } && exit
{% endhighlight %}

{% reveal %}
[![Gone in Sixty Seconds](http://jerodsanto.net/drop/gone-in-60.jpg)](http://www.imdb.com/title/tt0187078/)
{% endreveal %}

## Rebus #13

{% highlight ruby %}
begin
  [darren, judith].join
rescue
end
{% endhighlight %}

{% reveal %}
[![Saving Silverman](http://jerodsanto.net/drop/silverman.jpg)](http://www.imdb.com/title/tt0239948/)

[DURR!](https://www.youtube.com/watch?v=UNEfICd4dMY)
{% endreveal %}

## Rebus #14

{% highlight ruby %}
class Time; def kill; abort; end; end
t = Time.now
t.kill
{% endhighlight %}

{% reveal %}
[![A Time to Kill](http://jerodsanto.net/drop/time-to-kill.jpg)](http://www.imdb.com/title/tt0117913/)

This code is utterly asinine.
{% endreveal %}

## Rebus #15

{% highlight ruby %}
"スカーレット".encode "ascii" rescue ""
{% endhighlight %}

{% reveal %}
[![Lost in Translation](http://jerodsanto.net/drop/lit.jpg)](http://www.imdb.com/title/tt0335266/)

This one is pretty rad, if I do say so myself.
{% endreveal %}

---

Which was your favorite? Least favorite? How many of the 15 did you get right? Let me know in the comments!

[^1]: or is it rebi?

[ruby-rebus]:/2012/10/ruby-rebus
[imdb-top-250]:http://www.imdb.com/chart/top
