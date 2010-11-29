---
layout: post
published: true
title: "Rails: Nested Layouts"
excerpt: "Sometimes one layout (application.html.erb) just doesn’t cut it, but you don’t want a separate layout for each controller in your app. You can use the following technique to nest your Rails app’s layouts."
---

Sometimes one layout (application.html.erb) just doesn’t cut it, but you don’t want a separate layout for each controller in your app. You can use the following technique to nest your Rails app’s layouts:

In this example, there are two controllers for a simple todo list manager; `lists` and `tasks`

{% highlight ruby %}
#  application.html.erb
<html>
  <head>
    <title>
      TODO >> <%= yield(:title) || "Get things done!" %>
    </title>
    <%= stylesheet_link_tag 'todo' %>
  </head>
  <body>
    <div id="container">
      <p style="color: green"><%= flash[:notice] %></p>

      <%= yield :main %>
    </div>
  </body>
</html>
{% endhighlight %}

The key here is the `yield :main` which means we can use `content_for` to put our nested layouts’ output inside the yield. Here is the `lists` layout:

{% highlight ruby %}
# lists.html.erb
<% content_for :main do %>
  <div id="lists_container">
    <%= yield %>
  </div>
<% end %>
<%= render :file  => "layouts/application.html.erb" %>
{% endhighlight %}

Now your view gets rendered inside this layout’s `yield` and its all good in the hood. Cheers!
