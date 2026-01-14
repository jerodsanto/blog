---
title: Make ActiveAdmin and FriendlyId play nice
date: '2013-11-15'
categories:
- development
draft: false
---

[ActiveAdmin][AA] and [FriendlyId][friendly] are both handy gems, but they don't play nice together out of the box.

This is because `FriendlyId`'d models don't follow the default `to_param` style of id-based lookups which ActiveAdmin expects.

However, the two are easily reconciled by changing how ActiveAdmin fetches resources. Throw this in your ActiveAdmin initializer:

```ruby
# config/initializers/active_admin.rb
ActiveAdmin::ResourceController.class_eval do
  def find_resource
    id_field = "id"

    if scoped_collection.is_a? FriendlyId
      id_field = scoped_collection.friendly_id_config.query_field
    end

    scoped_collection.find_by! id_field => params[:id]
  end
end
```

That'll do it. You can alternatively define `find_resource` inside each registered resource's `controller` block if you want to be picky.

There may be a better way to derive the `id_field`, but I don't know it. Let me know if you do.

[AA]:http://activeadmin.info
[friendly]:https://github.com/norman/friendly_id
