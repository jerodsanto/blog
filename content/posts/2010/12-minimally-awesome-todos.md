---
title: Minimally Awesome Todos
date: '2010-12-01'
categories:
- hack
draft: false
---

Let's face it, we all spend way too much time trying out different todo systems and not enough time actually DOING the tasks we type, jot, or _bleed_ into them. If we were more honest with ourselves, we might even call them _todon't_ lists. This problem is so bad that there are people who make [careers][gtd] out of telling other people how to actually get stuff done.

Kinda sad, huh?


The good news is that I found a system that Just Works&reg; for me. It's minimal and it stays out of my way and yet it gets in my way just enough and, well, I think it's awesome. Maybe you will too. Maybe not, but even so you can take comfort in knowing that the perfect system for you is out there waiting to be found.

Okay, enough with the hyperbole. Here is how I'm todoing it.

## My Needs

First off, YMMV. I'm a particular guy and your needs may not line up with mine. Here's what I need from a todo system:

* **Easy Peasy** — For me to actually _use_ any system I must be able to add and remove tasks with virtually no effort. "Effort" in this context includes any steps between the task's inception in my brain to the moment when it is fully entered into the system.

* **Visibility** — Having a list of things you need to do is of no value if it doesn't stare you in the face on a regular basis. [Quietly judging you][frankmackey].

* **Nothing Else** — I don't need due dates or nesting or task dependencies or tagging or anything else. I don't even need sorting. These are not features. They are millstones.

It's simple, really. I just need a list of things that need doing staring me in the face. And I need to manipulate that list with ease. Nothing more.

## My System

The system I'm using consists of three pieces, two of which can be implemented on any stock UNIX-based operating system. The third piece employs a freeware application for Mac OS X called [GeekTool][geektool].

## 1) A Plaintext File

There is no better way to store a list of things than a good ole' text file. They're portable and readable by almost anything. I put mine in `~/Documents/todo`, but I'm considering moving it to my [Dropbox][dropbox] folder instead.

## 2) Bash Functions

I started off using Vim and TextMate to manage the text file, but even this was too much effort. I pretty much live in Terminal.app, and with the help of the awesome [Visor][visor] program I have access to it from anywhere on my system via a hot-key. So I wrote two very simple Bash functions instead. Be sure to set an environment variable for where the text file is located:

```bash
export TODO=~/Documents/todo
```


The first functions adds tasks to the todo list (or prints it to `STDOUT` if no arguments are given):

```bash
function todo() { if [ $# == "0" ]; then cat $TODO; else echo "• $@" >> $TODO; fi }
```

It is used like so:

```console
jerod@mbp:~$ todo put on some shades
jerod@mbp:~$ todo
• put on some shades
jerod@mbp:~$ todo eat some candy corn
jerod@mbp:~$ todo
• put on some shades
• eat some candy corn
```

Notice that I don't have to wrap the task text in quotes or anything. Again, simplicity is key.

The second function removes tasks from the todo list that match the arguments passed in to it:

```bash
function todone() { sed -i -e "/$*/d" $TODO; }
```

If I wanted to remove one of the tasks I created above, I could type:

```console
jerod@mbp:~$ todone shades
jerod@mbp:~$ todo
• eat some candy corn
```

It matches aggressively so I can get away with passing it as small a string as possible. This is a little dangerous because it will match multiple lines so I could end up removing more tasks than intended. For example, if I would have passed it the term `some` it would have removed both of my tasks. In practice I've never run into that problem. I rarely allow myself to have 10+ tasks in my list at any point, so the chance of string collisions is low.

## 3) A Desktop Embed

So far this system is nothing revolutionary. I wouldn't even call it special. Where my todo system really shines is in its ability to remind me of tasks I've created without being outright obnoxious.

I decided to embed the list right on my Mac's desktop.

!['todone in action'][todone]

This is powerful for a few reasons:

1. It's always visible.
2. It's subtle, not annoying.
3. I hate having anything on my desktop so it provides added motivation.

I use [GeekTool][geektool] to perform the embedding. GeekTool In it's own (ESL) words:

> It let you display on your desktop different kind of informations

This is really powerful, but please don't get carried away with it! To embed your todo list, create a new Shell Geeklet that `cat`s your text file. Here are the relevant properties for the one I created:

!['geeklet settings'][geeklet]

## Todone

I've been using this system for awhile now (longer than any other I've tried) and I still love it. The key is to keep your todo list small (isn't that the point, after all?) so you don't need to manage the crap out of it.

Now, if you'll excuse me. I'm going to go `todone blog about todo system`.

[gtd]:http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=gtd&x=0&y=0
[frankmackey]:http://www.imdb.com/title/tt0175880/quotes?qt0372122
[geektool]:http://projects.tynsoe.org/en/geektool/
[dropbox]:https://www.dropbox.com
[things]:http://culturedcode.com/things/
[visor]:http://visor.binaryage.com/
[todone]:http://jerodsanto.net/drop/todone-20101201-060519.png
[geeklet]:http://jerodsanto.net/drop/todone-geeklet-20101201-063708.png
