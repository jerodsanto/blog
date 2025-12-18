---
title: Traversing Directories with Ruby
date: '2008-07-15'
categories:
- development
draft: false
---

If you want to shove filenames of all files in a directory into an array, do:

```ruby
# (absolute path)
files = Dir["/Users/jerod/src/**"]
# (relative path)
files = Dir[File.expand_path("~/src") + "/**"]
# (in ENV["PWD"], aka current directory)
files = Dir["**"]
```

If you want to shove filenames of all files in a directory **recursively** into an array, do:

```ruby
# (absolute path)
files = Dir["/Users/jerod/src/**/**"]
# (relative path)
files = Dir[File.expand_path("~/src") + "/**/**"]
# (in ENV["PWD"], aka current directory)
files = Dir["**/**"]
```

It doesn’t get much easier than that.
