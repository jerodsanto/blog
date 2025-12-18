---
title: Trailing Conditionals Considered Harmful Unless Used Sparingly
date: '2015-03-08'
categories:
- development
draft: false
---

One Ruby feature that I fell in love with back in the day is the ability to tack conditionals on at the end of a line. For example, this bit of code:

```ruby
if some_condition?
  object.perform_some_action
end
```

Can be expressed as a one-liner, like this:

```ruby
object.perform_some_action if some_condition?
```

It's a small difference, but the latter form often maps more directly to how the author thinks about the problem. It feels even better when teamed with the `unless` keyword:

```ruby
object.perform_some_action unless some_condition?
```

After years of writing and reading code like this, I've slowly grown cold on the style.

# Why

The reason why I'm bearish on trailing conditionals may best be expressed by a road sign I saw on a recent road trip down Interstate 80:

![Not the actual sign I saw, but close enough](http://jerodsanto.net/drop/i-80-closed.jpg)

Notice the trailing conditional? A lot can go wrong with signs like these if the driver doesn't make it to the final line of the text. Why might that happen?

* The sign could be blocked by some obstruction until the last second
* The driver could be distracted by kids, the radio, their phone, etc. until it's too late
* A sign-related exit could be imminent with the driver in the wrong lane[^1]

In this case, **WHEN FLASHING** is the key indicator on the sign. Why is it the last thing mentioned? In the world of journalism they call this [burying the lead][bury-the-lead].

If the sign designer place **WHEN FLASHING** first, the driver could often skip the rest of the text altogether[^2]. This saves cognitive overhead that the driver can use elsewhere and avoids potential disasters that might occur if the conditional isn't understood in time.

In a slightly-tangential way, trailing conditionals violate the [Principle of Least Surprise][pola]. This principle &mdash; as most important things in life &mdash; made its way in to a Mitch Hedberg joke, in which he picks a fight with the phrase "Do Not Disturb":

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/194783967&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"></iframe>

The problem is exacerbated when driving 80 MPH on the interstate, but it exists in our code as well. The trailing conditional feels great when you're _writing_ the code, but it often makes it harder to _read_. This is most obvious when the operation that precedes the conditional is verbose. Take this fake code, for instance:

```ruby
call_this_really_long_method_that_is_probably_too_long_but_that_will_not_stop_us unless some_condition?
```

What if you didn't scroll over to see the `unless` at the end? You wouldn't know what's going on at all. Admittedly, method names of this length are rare, but _it is_ common to have trailing conditionals nested inside other control structures that have the same effect[^3].

[Code is read much more often than it is written][code-read], so we need to optimize for readability over writeability[^4]. Trailing conditionals tend to do the opposite.

## But

As with most things in software (and writing), there are exceptions. Some uses of trailing conditionals improve readability. The best case for them in my experience is with [guard clauses][guard-clause]. Guard clauses have a few characteristics that make them quite readable with trailing conditionals:

* They occur at the top of a method, so they are rarely nested themselves
* They often return or raise an error, which are brief statements
* There are often a few guard clauses together, so vertical brevity aides reading

Take a look at this method which returns a `price_range` string for a given object that responds to `price_minimum` and `price_maximum`:

```ruby
def price_range
  return @price_range if defined? @price_range
  return "" unless price_minimum
  return "" unless price_maximum

  # ... code to determine `minimum` and `maximum` ...

  @price_range = "#{minimum}-#{maximum}"
end
```

The first line [memoizes][memoization] the `price_range`, since this is apparently an expensive computation. Lines 2 and 3 are guard clauses. What would this look like with traditional conditionals?

```ruby
def price_range
  if defined? @price_range
    return @price_range
  end

  unless price_minimum
    return ""
  end

  unless price_maximum
    return ""
  end

  # ... code to determine `minimum` and `maximum` ...

  @price_range = "#{minimum}-#{maximum}"
end
```

This code requires more vertical work to parse. There's a 3rd form it could take, which is to put the conditionals first and still keep each one a one-liner:

```ruby
def price_range
  if defined? @price_range return @price_range
  if !price_minimum return ""
  if !price_maximum return ""

  # ... code to determine `minimum` and `maximum` ...

  @price_range = "#{minimum}-#{maximum}"
end
```

This works for me, but I prefer the return-first form because any time a method returns early we want to know about that _ASAP_.

## So

Think twice before slinging around trailing conditionals. They put the cart before the horse and in extreme cases they cause the reader to miss the horse altogether. This makes them often less readable than the traditional form.

Or maybe Mitch was right and we all just need to read faster!

[^1]: This is actually what happened to me. I barely deciphered the correct meaning in time.

[^2]: The road being closed is the exception, not the common case. This means the lights will rarely flash and the sign is most often irrelevant.

[^3]: This is [yet another reason][so-80-chars] that I advocate for 80-characters or less per line.

[^4]: The two are often coupled, but are sometimes at odds.

[bury-the-lead]: http://en.wiktionary.org/wiki/bury_the_lead
[so-80-chars]: http://stackoverflow.com/a/578318
[code-read]: http://blogs.msdn.com/b/oldnewthing/archive/2007/04/06/2036150.aspx
[pola]: http://en.wikipedia.org/wiki/Principle_of_least_astonishment
[guard-clause]: http://en.wikipedia.org/wiki/Guard_(computer_science)
[memoization]: http://en.wikipedia.org/wiki/Memoization
