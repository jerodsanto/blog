---
title: A Simple Pattern to Namespace and Selectively Execute Certain Bits of JavaScript
  Depending on Which Rails Controller and Action are Active
date: '2012-02-08'
categories:
- development
draft: false
---

Rails 3.1's asset pipeline compiles all of our JavaScript into a single file which is executed on all pages which include the `javascript_include_tag` method. Most of the time that method is in the layout, which means evey page gets the same bundle of JavaScript. This is great for caching, but not so great for selective code execution.

I developed a pretty simple pattern to namespace and selectively execute certain bits of JavaScript depending on which Rails controller action is active. Just do the following:

{{< aside "notice" >}}
I talk about JavaScript, but my code samples are all in CoffeeScript. That's because they're really the same thing. Aren't they?
{{< /aside >}}

## 1) Create an application object

Let's write a Rails app for accurately predicting weather patterns. We'll call it *Elijah*. The first step is to create a top-level JavaScript object named after our application.

Create `app/assets/javascripts/elijah.js.coffee`:

```javascript
this.Elijah ?= {}
```

This is also a nice place to define common methods that will be used all across the application.

All controller-level objects will be namescaped inside this object, so it must be specified first in the application manifest. Edit `app/assets/javascripts/application.js` like so:

```javascript
//= require jquery
//= require elijah
//= require_tree .
```

## 2) Add a JavaScript controller for each Rails controller

Each Rails controller will have a matching JavaScript controller to manage code executed on the Rails controller's actions.

*Elijah* has a `TemperaturesController`, so we need our JavaScript to follow suit. Create `app/assets/javascripts/temperatures.js.coffee`. In it, define a class and instantiate an object of the class.

```coffeescript
class TemperaturesController
    init: ->
        console.log "temps init!"

    index: ->
        console.log "temps index!"

this.Elijah.temperatures = new TemperaturesController
```

The `init` method is where to put any setup code that will be executed on before all actions for a given controller.

Each action can optionally have its own method which will be executed on it and no other actions owned by the controller.

This example will log "temps init!" followed by "temps index!" when a user visits the temperatures index.

## 3) Embed the current controller and action in the HTML

Somehow we have to let our *Elijah* JavaScript object know which controller/action pair are active for a given page request. I do this by adding `data-` attributes to the `body` element of the layout, like so:

```html
<body data-controller="<%= controller.controller_path %>" data-action="<%= controller.action_name %>">
```

It's important to use `controller_path` instead of `controller_name` if you ever want to namespace your Rails controllers.

## 4) Auto-execute the matching controller/action JavaScript

The last thing to do is make sure that the active Rails controller/action have their matching JavaScript controller/method executed when the page loads.

This can be set up right inside the application manifest file because code added there is executed *after* all other compiled code. This way we're sure to have our JavaScript controller objects in place.

It'll look something like this:

```javascript
// - snipped -
//= require_tree .

(function($, undefined) {
  $(function() {
    var $body = $("body")
    var controller = $body.data("controller").replace(/\//g, "_");
    var action = $body.data("action");

    var activeController = Elijah[controller];

    if (activeController !== undefined) {
      if ($.isFunction(activeController.init)) {
        activeController.init();
      }

      if ($.isFunction(activeController[action])) {
        activeController[action]();
      }
    }
  });
})(jQuery);
```

Nothing too crazy going on here. It just extracts the embedded controller/action combo and executes the matching JavaScript controller's `init` method followed by the action method.

Ruby controller namespaces need to be replaced by underscores in JavaScript. For example, an `Admin::UsersController` will require a JavaScript object called `Elijah.admin_users`.

## 5) There is no step 5

That's all there is to it. So far, this has worked pretty well to keep my JavaScript organized.

Are there better paths to the same goal? How do you go about it?
