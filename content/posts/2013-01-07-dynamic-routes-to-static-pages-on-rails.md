---
title: Dynamic Routes to Static Pages on Rails
date: '2013-01-07'
categories:
- development
draft: false
---

There's one thing that almost every web app and web site needs: **static pages**

Many Rails users turn to a gem like Thoughtbot's [High Voltage][high-voltage] to address this need. I tend not to do that for a few reasons:

*  Size matters. When it comes to Gemfiles, smaller is better.
*  Customization is inevitable, which often obviates any wins from going 3rd party
*  This is a trivial problem to solve

Having cleared that, how do we go about creating static pages in Rails?

Each static page needs 3 things:

1.  A controller action
2.  A view
3.  A route

Let's step through the process of providing these things for a static FAQ page.

**Step 1** is easy peasy. Create a `PagesController` and add an action method to it:

```ruby
class PagesController < ApplicationController
  def faq
    render
  end
end
```

That call to `render` is optional, but I think it's clearer than just leaving the method empty.

**Step 2** is required for any static page because it has to have *some* content. Create a view file:

```console
$ touch app/views/pages/faq.html.erb
```

The brute force way to handle **Step 3** would be to manually add a `get` route[^1] to `config/routes.rb`, like this:

```ruby
MyApp::Application.routes.draw do
  # other routes ...
  get "/faq", to: "pages#faq", as: :faq_page
end
```

That works, but gets pretty un-DRY as we add more static pages. Instead, we can dynamically generate the routes based on the controller's action methods.

We put this in our routes in place of the manual route:[^2]

```ruby
MyApp::Application.routes.draw do
  # other routes ...
  PagesController.action_methods.each do |action|
    get "/#{action}", to: "pages##{action}", as: "#{action}_page"
  end
end
```

From now on we can skip **Step 3** when adding new static pages!

We are also dynamically naming these routes so we can use all of the related helper methods, like `faq_page_path` and friends.

### Good, not great

I've found this to be a *pretty good* solution, but it's not ideal.

Ideally, we'd be able to sniff out the view files and generate action methods for them, but this has never been enough of a pain point for me to dig in and come up with a solution.

If you know how to get that done in an elegant fashion, please let me know!

[^1]: you can also use `matches`, but Rails 4 and beyond prefer `get`, `post`, etc.

[^2]: Rails puts controllers' *public* instance methods into `action_methods`, so any methods that you don't want having routes generated for need to be `protected` or `private`.

[high-voltage]:https://github.com/thoughtbot/high_voltage
