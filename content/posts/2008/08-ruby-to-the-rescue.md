---
title: Ruby to the Rescue
date: '2008-08-18'
categories:
- development
draft: false
---

Ruby makes handling exceptions super simple. Lets assume you’re about to run a sketchy bit of code, like requesting a remote web site. It might look something like this:

```ruby
require 'open-uri'
url = "http://slashdot.org/"
doc = open(url)
```

Now, what if [SlashDot][1] is down for maintenance, overloaded with traffic, or has blocked your IP for scraping their site every 30 seconds? This code nugget will fail and your program will explode like a piñata during Puerto Rico Days. Let’s account for this and terminate our program gracefully:

```ruby
require 'open-uri'
url = "http://slashdot.org/"
begin
   doc = open(url)
rescue
   puts "The request for a page at #{url} timed out...exiting."
  exit
end
```

Ahh, that’s better! But what if we’re iterating a list of url’s and scraping pages? Maybe we don’t want to exit the program at all, but continue with the next url in the list. I’ll demo with 3 urls:

```ruby
require 'open-uri'
urls = %w[ http://slashdot.org/ http://news.ycombinator.com/ http://www.techmeme.com/ ]
urls.each do |url|
  begin
    doc = open(url)
  rescue
    puts "The request for a page at #{url} timed out...skipping."
    next
  end
end
```

Now we safely output the offending error and continue with the next value in the urls array. That’s naace!

The truth is that this will not catch all exceptions. The problem is that when using the open-uri class you can receive an `OpenURI::Error` if the site you’re trying to access returns a 404, 403, 500 or other “not good” response, and you can receive a `Timeout::Error` if the site simply doesn’t respond at all and the request times out. Let’s modify our nugget to handle both scenarios:

```ruby
require 'open-uri'
urls = %w[ http://slashdot.org/ http://news.ycombinator.com/ http://www.techmeme.com/ ]
urls.each do |url|
  begin
    doc = open(url)
  rescue Timeout::Error
    puts "The request for a page at #{url} timed out...skipping."
    next
  rescue OpenURI::Error => e
    puts "The request for a page at #{url} returned an error. #{e.message}"
    next
  end
end
```

You can use multiple `rescue` blocks to handle multiple exception classes. Now we should have a bullet-proof code nugget. See any chinks in the armor? Let me know in the comments.


[1]: http://slashdot.org/
