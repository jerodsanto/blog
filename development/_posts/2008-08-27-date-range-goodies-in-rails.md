---
layout: post
published: true
title: "Date Range Goodies in Rails"
excerpt: "When it comes to dealing with dates and their formats between different databases, Ruby, time zones, etc, etc…it can get pretty nasty..."
---

Sometimes Rails just blows me away, and it just happened a few moments ago. When it comes to dealing with dates and their formats between different databases, Ruby, time zones, etc, etc…it can get pretty nasty. I can’t believe the amount of help Rails delivers in this arena.

Let’s assume I’m trying to track phone calls across time ranges; daily, monthly, yearly. This can usually become troublesome as I’ll have to query the database to find only records inside those ranges. I will spare you all the lame ways I tried to implement this by hand and just show you the code of how to create a named scope and call it using Rails 2.1.0.

{% highlight ruby %}
# in call.rb
class Call < ActiveRecord::Base
  named_scope :by_month, lambda { |d| { :conditions  => { :date  => d.beginning_of_month..d.end_of_month } } }
{% endhighlight %}

What this does is create a new scope called `by_month` that lets me query the database…by month :) and pass in a Date object as a single parameter. Rails/ActiveRecord will take the Date object and pass it to the lambda block, which calls the two Rails helpers ( `beginning_of_month` and `end_of_month` ) to find the date range for the month my Date object is in. It then queries the database using that date range!

Awesome.

Now I can access the records I want like this:

{% highlight ruby %}
this_months_calls = Call.by_month Date.today
{% endhighlight %}

And Rails will return all the calls that were recorded during the current month. Love it.
