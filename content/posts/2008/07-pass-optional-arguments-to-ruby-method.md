---
title: Pass Optional Arguments to Ruby Method
date: '2008-07-24'
categories:
- development
draft: false
---

This is the _Ruby way_ of passing optional arguments with default values into a method:

```ruby
def awesomeness options = {}
  #sensible defaults
  opts = {
   :name   => "Jerod",
   :handle => "jerodsanto",
   :blog   => "Standard Deviations"
  }.merge options

  opts.each { |key,value| puts "#{key} = #{value}" }
end
```

When called sans arguments this function will print the following:

```ruby
awesomeness
handle = jerodsanto
name = Jerod
blog = Standard Deviations
```

When called with arguments this function will merge them into the opts variable and print the following:

```ruby
awesomeness :name => "Santo"
handle = jerodsanto
name = Santo
blog = Standard Deviations
```

The defaults are used unless you specify an override in the method call, in which case the override is merged into the opts hash.
