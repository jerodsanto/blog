---
title: Getting ready for Lenny
date: '2009-02-16'
categories:
- sysadmin
draft: false
---

You don't need to fire up an editor to switch your APT repositories from Debian 4 (Etch) to Debian 5 (Lenny):

```ruby
ruby -i -pe '$_.gsub!("etch","lenny")' /etc/apt/sources.lst
```
