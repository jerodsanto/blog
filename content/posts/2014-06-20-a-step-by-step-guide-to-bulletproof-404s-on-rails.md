---
title: A step by step guide to bulletproof 404s on Rails
date: '2014-06-20'
categories:
- development
draft: false
---

## Step 1: Configure your router as the exceptions app

Since Rails 3 you've been able to configure an app to handle exceptions, which you want to point right at your router. To do this, add the following to `config/application.rb`:

```ruby
module MyApp
  class Application < Rails::Application
    config.exceptions_app = self.routes
  end
end
```

## Step 2: Add a catch-all route

Make sure this is the last rule in `config/routes.rb`:

```ruby
MyApp::Application.routes.draw do
  get "*any", via: :all, to: "errors#not_found"
end
```

With this, any requested path &mdash; whatever the request type &mdash; that doesn't match the previous routing rules will match this rule. The `*any` path starts with the `*` wildcard, so it will match anything. The `any` part is arbitrary, but you have to put *something* after the `*` to make it work. I'm sure there's a good reason why, but somebody else will have to explain it.

## Step 3: Implement ErrorsController#not_found

```ruby
class ErrorsController < ApplicationController
  def not_found
    respond_to do |format|
      format.html { render status: 404 }
    end
  rescue ActionController::UnknownFormat
    render status: 404, text: "nope"
  end
end
```

You may be wondering why I suggest rescuing `ActionController::UnknownFormat` instead of adding a `format.any` block to handle any non-html request types. The problem with `format.any` is that it will only handle *known* mime types. This is a-okay for 404'ing `.png`s, `.json`, `.xml`, etc., but it doesn't handle the real crazy stuff, like `wp-login.php`. In other words, when it comes to catch-alls, `ActionController::UnknownFormat` has a bigger glove than `format.any`.

## Step 4: Add a view

Create `app/views/errors/not_found.html.erb` and put your 404 page's markup in there. This will use the application layout by default, so your 404 page will fit in with the rest of your site's style.

## Step 5: Have a Moscow Mule

Or an iced tea. Or some lemonade. Your call.
