---
title: Three Ways to Retain Your Dev Flow
date: '2011-01-14'
categories:
- hack
draft: false
---

Context switching: computers are great at it, humans suck at it.

Every time we developers lose the context of our current task we're forced to waste precious time getting it back. The harder the problem we're trying to solve, the longer it takes to reinstate its context in our mind. This is why many developers strive to reduce interruptions, set aside large blocks of time, and create an environment that helps them get into the [flow][flow] _and stay there_.

[![the flow][silkflow]][weavesilk]

The problem is, there are times when we absolutely must leave our development context behind and pick it back up later. Sometimes it's 30 minutes, sometimes it's overnight. I find these times very frustrating and have found a few techniques that help me quickly get my flow back upon returning.

## 1) Note to Self

Leave yourself a little note saying what you were up to. This is probably the most obvious technique, and can be quite effective. The problem I've found with this is that I often forget to do it or am just too tired/lazy at the end of the day to do it consistently.

I need to write myself a note to remind myself to write myself notes. Guh, yeah.

## 2) Always Be Failing

Leave one or more tests in your test suite failing (you are writing tests, yes?). When you return to the project your first step is to run the test suite and you'll see the failing test(s). This one works really well, but much like leaving yourself notes it's something that you have to actively participate in. It can actually take more time and effort to employ than leaving notes.

## 3) Git Dirty

This is my favorite and most oft used technique. Leave your Git (or the DVCS of your choice) staging area in a dirty state.

![git dirty][dirty]

When you return, you'll see all the changes you most recently made before you left off. This, combined with a quick perusal of the commit log will quickly bring your context back. The advantage of this over the others is that it is somewhat participation-free. Simply _fail to_ commit your last changes and they'll be there waiting for you. At least for me, this is far more likely to happen than technique #1 or #2.

## 4) ???

Those are a few things I've been doing to get my dev flow back quickly, but I'm sure there are others. Do you have any tricks up your sleeve? I'd love to hear 'em!

[flow]:http://amzn.to/hL0XDk
[silkflow]:http://jerodsanto.net/drop/silk-flow-20110113-171737.jpg "The Flow"
[weavesilk]:http://weavesilk.com/ "Image created with the Silk project"
[dirty]:http://jerodsanto.net/drop/git-dirty-20110113-173209.jpg "unstaged changes"
