---
title: Just Abort It
date: '2009-08-24'
categories:
- development
draft: false
---

A lot of people end up writing Ruby methods that looks something like this:

```ruby
def stop_error(message)
  puts "ERROR: #{message}"
  exit(1)
end
```

Which they call in their app like so:

```ruby
stop_error "Oh noes, file doesn't exist!" unless File.exist?(file)
```

I used to write that method a lot too. Did you know Ruby has a built-in method that provides just what we're all looking for?

`Kernel::abort`

So, stop writing your own little method and just abort it:

```ruby
abort "Oh noes, file doesn't exist!" unless File.exist?(file)
```
