---
layout: post
published: true
title: "Mini Book Review: Ruby Best Practices"
excerpt: "I just finished reading Gregory Brown's **Ruby Best Practices** (RBP). I could probably write a book about this book, but I hate long book reviews so I'll try to keep this short."
---

I just finished reading Gregory Brown's "**Ruby Best Practices**" (RBP). I could probably write a book about this book, but I hate long book reviews so I'll try to keep this short.

## In Summary

If you are an intermediate-to-expert Ruby programmer you should absolutely read this book. Beginners may want to start elsewhere and work their way up. [Where To Get It][1]

## In Detail

The beauty and power of Ruby is its dynamism which leads to freedom. The problem with freedom is it means [TMTOWTDI][2]. The problem with [TMTOWTDI][2] is best summarized by me, in a quote of myself:

> "There is more than one way to do it but most of them are really, really bad."

Thankfully, we can combat these bad coding methods by resorting to helpful idioms and best practices, and Ruby has these in spades. The purpose of **RBP** is stated plainly on the front cover:

> "Increase Your Productivity -- Write Better Code"

With that in mind, here is a breakdown of what it offers:

The first thing I noticed when reading **RBP** is that it uses real-world code samples. None of that "let's make a tic-tac-toe game" type of stuff. Gregory uses a couple of his own projects (Prawn & Ruport) as well as other popular libraries (Haml, flexmock, XML Builder, Gibberish, faker). This is beyond awesome.

He also steps through a lot of code using IRB, which means you can follow right along in your favorite shell. Gregory highly recommends you get your hands dirty with the code he presents and I agree with him. However, I also like to read physical books in places not my computer, since the opportunity so rarely presents itself.

The book starts, aptly, with a chapter on testing. The following two chapters are (for me) the highlights:

_**Designing Beautiful APIs**_ and _**Mastering the Dynamic Toolkit**_.

The value found in these two sections alone cover the cost of the entire book. A few of the topics discussed include: flexible argument handling, code blocks, implementing per-object behavior, building classes and modules programatically and registering hooks and callbacks. Gregory released a free section of _**Mastering the Dynamic Toolkit**_ so you don't have to take my word for it, [have a taste for yourself.][3]

I need to wrap this up or I'll be forced to remove the "**Mini**" from the post title. You'll also find sections on File & Text processing, functional programming, debugging, project maintenance (much of which is obsolete if you use the wonderful [Jeweler gem][4]), and internationalization.

Tips, tricks and suggestions abound. Even expert-level Rubyists should learn something. **RBP** left me wanting more of Gregory's teaching. He really does a good job of explaining concepts and walking through code. Thankfully, he started up a [Ruby Best Practices blog][5] with more content!

<h3 id="wheretobuy">Where to Buy</h3>

**RBP** is an O'Reilly publication and they have it on sale at their web site for **$34.99**.

However, I don't know why you'd do that because Amazon has it for **$23.10** and eligible for free shipping with Amazon Prime. Booyah!

If you go that route, use [this link][6] to pitch me a little something for the effort, or just buy directly via [this link][7].


[1]: #wheretobuy
[2]: "http://en.wikipedia.org/wiki/There%27s_more_than_one_way_to_do_it"
[3]: "http://cdn.oreilly.com/books/9780596523008/Mastering_the_Dynamic_Toolkit.xml.pdf"
[4]: "http://github.com/technicalpickles/jeweler/"
[5]: "http://blog.rubybestpractices.com/"
[6]: "http://www.amazon.com/gp/product/0596523009?ie=UTF8&tag=standadeviat-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0596523009"
[7]: "http://www.amazon.com/Ruby-Best-Practices-Gregory-Brown/dp/0596523009/ref=sr_1_1?ie=UTF8&s=books&qid=1249140448&sr=8-1"
