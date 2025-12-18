---
title: A simple Ruby method to send email
date: '2009-02-17'
categories:
- development
draft: false
---

I have tried many different Ruby mailers and they all have their problems. The [Pony gem][1] by Adam Wiggins is right up my alley but even that has given me a hard time sending emails. Plus, sometimes you just don't want your little Ruby script having to require rubygems.

I always end up reverting to a simple method I wrote awhile back and it just works. Feel free to use it and adjust to your needs:

```ruby
require 'net/smtp'

def send_email(to,opts={})
  opts[:server]      ||= 'localhost'
  opts[:from]        ||= 'email@example.com'
  opts[:from_alias]  ||= 'Example Emailer'
  opts[:subject]     ||= "You need to see this"
  opts[:body]        ||= "Important stuff!"

  msg = <<END_OF_MESSAGE
From: #{opts[:from_alias]} <#{opts[:from]}>
To: <#{to}>
Subject: #{opts[:subject]}

#{opts[:body]}
END_OF_MESSAGE

  Net::SMTP.start(opts[:server]) do |smtp|
    smtp.send_message msg, opts[:from], to
  end
end
```

Everything but the `to` argument is optional. You can invoke the method like so:

```ruby
send_email "admnistrator@example.com", :body => "This was easy to send"
```


[1]: http://github.com/adamwiggins/pony/tree/master
