---
title: Making Rails 3's Mail Gem and Paperclip Play Nice
date: '2010-12-09'
categories:
- development
draft: false
---

I have a Rails application that allows people to email in attachments that become documents in the system. I use the excellent [Paperclip][paperclip] gem to handle the files attached to the documents. You know, like this:

```ruby
class Document < ActiveRecord::Base
  has_attached_file :data, :url => "/system/docs/:id/:style/:filename"
  # ... clip ...
end
```


I _was_ using the [TMail][tmail] gem to parse the incoming emails and send the attachments to Paperclip. It looked a bit like this:

```ruby
email = TMail::Mail.parse(incoming)

if email.has_attachments?
  email.attachments.each do |attachment|
    d = Document.new
    d.data = attachment
    d.save
  end
end
```

That's pretty easy. But..

TMail has been deprecated (it seg faults Ruby 1.9) and replaced by the shiny new [Mail][mail] gem. I'm not complaining, Mail is better than TMail in just about every way, but how it handles attachments doesn't jive with the old method of sending the data to Paperclip.

The reason is that Mail treats attachments just like any other message `Part`, but Paperclip expects an I/O object from which it can derive the `original_filename`, `content_type`, and `size`. TMail provides an object like this for each attachment, but we have to make Mail play nice. Here's how:

```ruby
module Mail
  class Part < Message
    class PaperclipAttachment < StringIO
      attr_accessor :original_filename, :content_type
    end

    def to_paperclip
      return nil unless attachment?

      paperclip = PaperclipAttachment.new(body.decoded)
      paperclip.original_filename = filename.strip unless filename.blank?
      paperclip.content_type = content_type[/^(.*);/, 1]
      paperclip
    end
end
```

What's goin on here is opening up Mail's `Mail::Part` class and adding a new instance method called `to_paperclip`. That method will take the known data on the message part and create a new `PaperclipAttachment` object. The `PaperclipAttachment` class is just Ruby's `StringIO` class with two extra attributes that Paperclip needs.

The only tricky part is perhaps the regular expression being used to set `content_type`. The reason for this is that attachment parts have more than just the content type in their `ContentType` field. They usually look something like this:

```console
Content-Type: image/png; name="jms.png"
```

We don't want the name in this case, so I'm removing that portion. Please let me know if there is a better way of doing this (does Mail support it somehow?).

Now, revisiting the code to create new documents from email, except using our extended Mail instead of TMail:

```ruby
email = Mail.new(incoming)

if email.has_attachments?
  email.attachments.each do |part|
    d = Document.new
    d.data = part.to_paperclip
    d.save
  end
end
```

And there you have it!

[paperclip]:https://github.com/thoughtbot/paperclip
[tmail]:http://tmail.rubyforge.org/
[mail]:https://github.com/mikel/mail
