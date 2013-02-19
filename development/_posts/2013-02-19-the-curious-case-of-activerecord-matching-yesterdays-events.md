---
layout: post
published: true
title: "The Curious Case of ActiveRecord Matching Yesterday's Events Even Though I Told it Not To"
excerpt: "We uncovered a Strange Thing when working on <a href='http://omahype.com'>Omahype's</a> event listings.
"
---

We uncovered a Strange Thing when working on [Omahype's][omahype] event listings.

{% aside notice %}
Omahype is a curated events calendar helping to foster art and culture in Omaha and the surrounding areas. If you're in the area, you should definitely check it out!
{% endaside %}

## The Strange Thing

Omahype's `Event`s, which are ActiveRecord models, have a `start_time` field which we use to show people when the event starts.

We also use this field to distinguish past events from upcoming ones. The site's [category views][omahype-category] call `Event.upcoming` to get only events from today and into the future. It looks something like this:

{% highlight ruby %}
def self.upcoming
  where("start_time >= ?", Date.today).order("start_time asc")
end
{% endhighlight %}

That looked pretty good to me, but once the site was in production we noticed a problem.

![][i-dont-always-test-my-code]

The category views were displaying last night's events in addition to the ones we wanted. Troublesome. I added a test case[^1] which reproduces the behavior:

{% highlight ruby %}
describe Event do
  describe ".upcoming" do
    it "doesn't match events from last night" do
        last_night = Time.now.beginning_of_day - 2.hours
        create :event, start_time: last_night
        expect(Event.upcoming.count).to eq 0
    end
  end
end
{% endhighlight %}

That test failed, but why is that?

The query says that the start time must be greater than or equal to today's date and that's surely not the case with last night's events. Or is it?

## The Reason

ActiveRecord stores all timestamps in the database as [UTC][utc] and converts back and forth between the applicable time zone in Ruby land before executing queries.

Usually this works just fine with timestamp comparisons because the offsets are adjusted before the database makes the comparison, but it doesn't work so well when you are comparing against just a date.

Omahype only tracks events in Omaha so we have Rails configured to use US Central Time (CST):

{% highlight ruby %}
# config/application.rb
module Omahype
  class Application < Rails::Application
    config.time_zone = "Central Time (US & Canada)"
  end
end
{% endhighlight %}

The problem is that CST is UTC-6 (or -5 during daylight savings), so any event created with a `start_time` of 6pm or later will be stored in the database as bright and early on the following morning.

To be clear, when we do this in Ruby:

{% highlight ruby %}
Event.create start_time: Time.parse("2013-02-19 20:00:00")
{% endhighlight %}

In the database (Postgres, in our case), it will be stored as a [timestamp without time zone][timestamp-without-time-zone] of "2013-02-20 02:00:00".

See the problem?

In UTC that event does start today even though in CST it starts last night. ActiveRecord can adjust the right-hand side of the comparison to UTC before executing the query, but it can't do anything about the left-hand side.

Converting the right-hand side to UTC doesn't help us because the date remain the same.

Bummer.

## The (not so great) Solution

We decided to convert the left-hand side of our comparison from UTC to CST.

In Postgres you can use `AT TIME ZONE` to explicitly set the time zone which applies to a timestamp column. With this in hand, I adjusted the method to look like this:

{% highlight ruby %}
def self.upcoming
  where("start_time at time zone 'CST' >= ?", Date.today).order("start_time asc")
end
{% endhighlight %}

Unfortunately, my test was still red.

This confused me to no end, but it turns out that `AT TIME ZONE` only converts the time value when it is applied to a `timestamp with time zone` field not a `timestamp without time zone` field, which `start_time` is.

Here's [their chart][pg-at-time-zone-docs] of how it works for different field types:

[![Click to see actual docs if it is too squished for your eyes][pg-at-time-zone-chart]][pg-at-time-zone-docs]

So I had to first convert `start_time` to a `timestamp with time zone` of UTC and then convert it from UTC to CST. Like this:

{% highlight ruby %}
def self.upcoming
  where("start_time at time zone 'UTC' at time zone 'CST' >= ?", Date.today).order("start_time asc")
end
{% endhighlight %}

That is pretty ugly if you ask me, but the test was green.

Finally.

## The Alternatives (?)

There are a bevy of problems that I have with this solution.

1.  I hardcoded 'CST' into the query, which is okay for this app but would not work if we were switching time zones based on user location or any other criteria.

2.  The two calls to `at time zone` slow down the query by a smidgeon. Not much, but enough to not like it.

3.  Other finder methods will have to also use this workaround or they, too, will return bad results.

I'd love to hear of others way to tackle this problem. One thing I thought of would be to store a separate `start_date` field alongside the `start_time`. That would make all comparisons apples-to-apples (dates-to-dates), but that is inelegant because it requires us to manage the two fields in the code and ensure they aren't different.

Perhaps there is a smarter way to perform the same type of query? Or maybe I'm missing some obvious time zone conversion thing in ActiveRecord that obviates the need for db-side conversions?

Please let me know if you have any insight on this curious case!

[^1]: I would have caught it sooner, but my original tests didn't cover the edges well enough. They used events from 10 days ago instead of last night.

[omahype]:http://omahype.com
[omahype-category]:http://omahype.com/category/music
[i-dont-always-test-my-code]:http://jerodsanto.net/drop/test-in-production.png
[utc]:http://en.wikipedia.org/wiki/Coordinated_Universal_Time
[timestamp-without-time-zone]:http://www.postgresql.org/docs/9.2/static/datatype-datetime.html
[pg-at-time-zone-chart]:http://jerodsanto.net/drop/pg-at-time-zone-chart.jpg
[pg-at-time-zone-docs]:http://www.postgresql.org/docs/9.2/static/functions-datetime.html#FUNCTIONS-DATETIME-ZONECONVERT

