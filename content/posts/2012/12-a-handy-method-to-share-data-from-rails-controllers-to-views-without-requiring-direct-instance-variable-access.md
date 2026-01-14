---
title: A Handy Method to Share Data From Rails Controllers to Views Without Requiring
  Direct Instance Variable Access
date: '2012-12-18'
categories:
- development
draft: false
---

Rails' method of sharing data between controllers and views via instance variables bothers many developers. For the uninitiated, a Rails controller method like this one...

```ruby
class EventsController < ApplicationController
  def index
    @events = Event.scoped
  end
end
```

... makes the `@events` instance variable accessible to the rendered view.

This bugs me, too. My beefs with it are:

* It is counterintuitive. Why would an *instance* variable be how you make something available *outside* the instance?
* It couples the view and the controller more than necessary, shedding Ruby's encapsulation strength of having method calls and ivar accessors identical.
* Views and partials have varying access to the instance variable, which is confusing.

Better would be explicitly exposing the events collection to views via a reader and helper method, like this:

```ruby
class EventsController < ApplicationController
  def index
    @events = Event.scoped
  end

  attr_reader :events
  helper_method :events
end
```

Now all views can just call the `events` method and not worry about the ivar.

This becomes cumbersome when you do it across many controllers and actions, so I use this handy method to "automate" the process to expose certain ivars to views:

```ruby
class ApplicationController < ActionController::Base
  # short hand for exposing a list of ivars to view objects
  def self.exposes(*ivars)
    ivars.each do |ivar|
      attr_reader ivar.to_sym
      helper_method ivar.to_sym
    end
  end
end
```

The method takes an arbitrary list of ivar names. Using it, the example  controller class looks like this:

```ruby
class EventsController < ApplicationController
  exposes :events

  def index
    @events = Event.scoped
  end
end
```

Unfortunately, the view **can** still access `@events`, but it's a step in the right direction.

I'm sure there are ways to stop direct access of instance variables from views, but I haven't gotten that drastic yet.

I've gotten a lot of mileage out of this method. Perhaps you will too.
