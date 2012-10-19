---
layout: post
published: true
title: "A Common Gotcha When Using Ruby Regexps For Input Validation"
excerpt: "Ruby's regular expressions have an idiosyncrasy that can get you in trouble when doing input validation. Find out how to avoid this common gotcha in this post."
---

One difficulty of using [Regular Expressions][regexp] effectively is that each language has their own little idiosyncrasies that can get you in to trouble.

Ruby has a particularly nasty Regexp foible around start-of-string and end-of-string anchors that confuses many of us, my-previous-self included.

In most languages, the `^` and `$` special characters match the start and end of a *string*, respectively. You can also opt in to multi-line mode where they will instead match the start and end of a *line*.

In Ruby, these characters start off in multi-line mode. This is not unknown. In fact, the Rails documentation [states this][rails-docs-note] loud and clear:

> Note: use \A and \Z to match the start and end of the string, ^ and $ match the start/end of a line.

Unfortunately, I still see this advice ignored in many codebases. Let's use an ActiveRecord validation example to see why this is so dangerous.

I present to you a recipes web app that lets users create and share dishes. Each dish has a name, which can be a string of alphanumeric characters. The model might look like this:

{% highlight ruby %}
class Dish < ActiveRecord::Base
  validates :name, format: /^[\sa-z0-9]+$/i
end
{% endhighlight %}

You may think that is Regexp says:

1. start of string
2. one or more spaces or alphas or numerics
3. end of string
4. case insensitive

In Perl you would be correct. In Ruby; not so much. Let's give this a test drive and see if we can break it:

{% highlight ruby %}
Dish.new(name: "Best Pizza Evar").valid?
# => true
{% endhighlight %}

So far so good, but that `$` only matches to the end of a line. This also works:

{% highlight ruby %}
Dish.new(name: "Best Pizza Evar\n just kidding").valid?
# => true
{% endhighlight %}

That's not good. Users can bypass our validation by inserting arbitrary `\n` characters followed by whatever else they want. You know, like this:

{% highlight ruby %}
Dish.new(name: "Best Pizza Evar\n<script>alert('pwned!');</script>").valid?
# => true
{% endhighlight %}


Thankfully, modern versions of Rails will auto-escape the dish name on its way out of the database before sending it down the wire, but we still don't want it in our database for obvious reasons.

This gotcha can be easily avoided if we just follow the note in the Rails docs and use `\A` and `\Z` instead:

{% highlight ruby %}
class Dish < ActiveRecord::Base
  validates :name, format: /\A[\sa-z0-9]+\Z/i
end
{% endhighlight %}

Now let's see if the same hack will subvert our validations:

{% highlight ruby %}
Dish.new(name: "Best Pizza Evar\n<script>alert('pwned!');</script>").valid?
# => false
{% endhighlight %}


Crisis averted!

[regexp]:http://en.wikipedia.org/wiki/Regular_expression
[rails-docs-note]:http://apidock.com/rails/ActiveModel/Validations/ClassMethods/validates_format_of
