---
title: Extending TMail::Mail for HTML and plaintext only
date: '2009-02-21'
categories:
- development
draft: false
---

A project I'm working on required a little more from Ruby's TMail library than it offers out of the box. One of the things that make Ruby great is how you can dynamically extend classes.

TMail can parse a raw email and provide you with the headers, subject, body, etc. But what it doesn't do is parse the body and pull out the html and/or plaintext from multi-part emails. Well, now it can.

I found a great little piece of code on [Google Code][1] called [tmail-html-body-extractor][2]. It was written by [Fernando Guillen][3] and released under the Apache License 2.0.

Fernando's code was great, but its intent was returning just the html from the email body. For my current project, I am more interested in just the plaintext from the email body, so I added this functionality.

Thanks to the openness of the [Apache License 2.0][4], I was able to extend his script and re-release it on GitHub with my modifications.

Now its trivial to return just the html from an email body, or just the plaintext:

```ruby
require "rubygems"
require "action_mailer"
require "tmail_mail_extension"

mail = TMail::Mail.parse(raw_email)

mail.body_html  # returns just html if available or nil
mail.body_plain # returns just plaintext if available or nil
```

You can get the source on [GitHub][5]!


[1]: http://code.google.com
[2]: http://code.google.com/p/tmail-html-body-extractor/
[3]: http://fernandoguillen.info
[4]: http://www.apache.org/licenses/LICENSE-2.0
[5]: http://github.com/jerodsanto/tmail_body_extractors/tree/master
