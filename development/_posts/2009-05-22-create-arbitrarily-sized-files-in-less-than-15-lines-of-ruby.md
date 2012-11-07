---
layout: post
published: true
title: "Create Arbitrarily Sized Files In Less Than 15 Lines of Ruby"
excerpt: "With this little Ruby script, you can arbitrarily generate files of any size (using 1MB increments)."
---

Ok, so I'm having fun with this "in less than 15 lines of Ruby" idea, but this time I turn my attention away from Twitter (I know, that's hard to do right now) and toward file generation.

Sometimes you just need a 1GB file. Or a 350MB file. Or a 1MB file. It doesn't matter what is in that file, but size does matter (heh).

With this little Ruby script, you can arbitrarily generate files of any size (using 1MB increments).

### The Script

{% highlight ruby %}
print 'Enter file size (MB): '
the_size = gets.chomp

fail "bad file size" unless the_size =~ /^\d+$/

file_size = 0
string    = "abcdefghijklmnopqrstuvwxyz123456"

File.open(the_size + 'MB', 'w') do |f|
  while file_size < the_size.to_i * 1048576 # bytes in 1MB
    f.print string
    file_size += string.size
  end
end
{% endhighlight %}

The resulting file will be named "**[X]MB**" where **X** is the size you requested.

### A Note

This script is derived from one I found awhile ago somewhere on the internet (don't remember where). It didn't work correctly (file sizes were off) and was much more verbose.

Enjoy!
