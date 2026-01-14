---
title: CoffeeScript Classes Play Nicely with AngularJS Factories
date: '2013-07-28'
categories:
- development
draft: false
---

One of CoffeeScript's many virtues is built-in support for [classes, inheritance, and super][cs-classes] via the `class` keyword. One of AngularJS's many virtues is built-in [dependency injection of services][angular-services] via factory functions.

How do you use CoffeeScript classes and AngularJS factories together? There is no trickery needed at all. You just define your class like this:

```coffeescript
app.factory "Ticket", ->
    class Ticket
        constructor: (@price, @count) ->

        amount: ->
            @price * parseInt(@count, 10)
```

Now you can inject a `Ticket` factory into, for instance, your controller context and use it like so:

```coffeescript
app.controller "MainCtrl", ($scope, Ticket) ->
    $scope.ticket = new Ticket(100, 2)
```

And use it in a template if you like:

```html
{% raw %}
<div ng-controller="MainCtrl">
  <p>That'll be {{ticket.amount()}} pesos, amigo</p>
</div>
{% endraw %}
```

Thanks for playing nice, you two.

[cs-classes]:http://coffeescript.org/#classes
[angular-services]:http://docs.angularjs.org/guide/dev_guide.services.creating_services
