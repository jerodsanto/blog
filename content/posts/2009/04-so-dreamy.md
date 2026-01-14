---
title: So Dreamy!
date: '2009-04-18'
categories:
- announcement
draft: false
---

DreamHost is running a [kick-off competition][1] in support of their newly released [API][2]. It seems like their developer community could use a little productivity boost, so I thought I'd create a Ruby library to interact with their API.

The resulting Ruby Gem, [available on GitHub][3], is called "**Dreamy**" and includes a library and a command-line tool.

Why a command-line tool? Because sometimes you wanna see what's going on with your DH account without having to pop open the control panel (also, as an example of how to use the library). Here is some sample output returning all DNS records for domains matching the string "rachel" (my wife's name):

[<img class="aligncenter size-full wp-image-202" title="dreamy_output" src="/wp-content/uploads/2009/04/dreamy_output.png" height="227" alt="dreamy_output" width="443" />][4]

Isn't that table-based formatting _dreamy_?!?! Next up, a listing of all domains on the account and their availability. If one of the domains is down, it will ping the domain's host server to determine if the problem is system-wide or not:
[<img class="aligncenter size-full wp-image-231" title="dh_domain_status" src="/wp-content/uploads/2009/04/dh_domain_status.png" height="110" alt="dh_domain_status" width="443" />][5]


There are many more things you can do with the command-line tool, but you can check out those by installing the gem and running:

```bash
dh help
```

How do you install the gem? It's super-simple (if you already have Ruby and RubyGems installed):

```bash
gem install dreamy
```

Booyah!

How do you use the library? Well, you just require it into your Ruby program and hit the ground running!

```ruby
require 'rubygems'
require 'dreamy'

account = Dreamy::Base.new(username, api_key)

# get an array of Domain objects
account.domains
# get an array of User objects
account.users
# get an array of DNS objects
account.dns
# get an array of Subcribers to "my_list@example.com"
account.announce_list("my_list","example.com")
# add a subscriber to "my_list@example.com"
account.announce_add("my_list","example.com","guy@gmail.com")
# remove a subscriber to "my_list@example.com"
account.announce_remove("my_list","example.com","guy@gmail.com")
```

The Domain, User, DNS, and Subscriber objects that are returned in the arrays include all the data that DreamHost exposes about them from their API. For instance, I can print the attributes of the Domain object like so:

```ruby
account.domains.first.instance_variables
```

Which returns:

```ruby
["@www_or_not", "@user", "@php", "@path", "@fastcgi", "@unique_ip", "@passenger", "@type", "@account_id", "@security", "@home", "@domain", "@outside_url", "@xcache", "@php_fcgid", "@hosting_type"]
```

To find out more about the library, head over to the project's [GitHub page][6] and check out the README.

Let me know what you think!

**UPDATE:** Dreamy is now 100% API Compatible (and a whole lot cooler!) Check out [my second blog post outlining the changes][7]

**NOTE #1: The DreamHost API is still young and in heavy development. Dreamy is nowhere near a comprehensive library, but I wanted to get it into the public so other developers could use it for their competition projects. Please, if you find any bugs or want to add functionality... please, please, please fork the project and help out!**


[1]: http://blog.dreamhost.com/2009/04/09/big-boy-time/
[2]: http://wiki.dreamhost.com/API
[3]: http://github.com/jerodsanto/dreamy
[4]: /wp-content/uploads/2009/04/dreamy_output.png
[5]: /wp-content/uploads/2009/04/dh_domain_status.png
[6]: http://github.com/jerodsanto/dreamy/
[7]: /2009/05/dreamy-now-with-100-api-coverage
