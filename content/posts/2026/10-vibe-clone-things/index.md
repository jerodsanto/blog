---
title: Vibe cloning all the things
stab:
slug: vibe-clone-things
date: 2026-10-24T19:53:03.651Z
image: vibe-clone-things.jpg
draft: false
---

I'm observing a change in my computing desires that is both exciting and concerning. Exciting because my life is more fun and fulfilling this way. Concerning because of what it all means. Let me explain...

I don't really want other people's software anymore. I much prefer my own, personalized clone of other people's software. Don't get me wrong, I'm mostly running other people's software. And much of it is very good. But as soon as I bump up against:

- a UI that confuses me
- a decision I don't like
- a feature that's missing
- a paywall that feels too high

I tell Claude Code to vibe clone[^1] that sucker. It's amazing how well it can one-shot the core feature(s) of every moderately simple app I've asked of it. Here's two examples, one for the taste and one for the money.


### Snip ✂️

[LosslessCut](https://losslesscut.app) is an awesome, open source "Swiss Army Knife of Lossless Video/Audio Editing." I use it to extract small sections out of long videos. It's useful! But it has some UI quirks and doesn't support all the keyboard shortcuts I'm used to. It's open source, so I could've forked it and added those, but it also does a bunch of things I couldn't care less about, so why not just clone the parts I use, make it work the way I want, and be done with it?

That's what I did and after fifteen minutes of iterating I now have my very own app called *Snip* that I love using. It does everything I want. It does it exactly the way I want. And it does nothing else.


### Loop 🔁

[Rogue Amoeba](https://rogueamoeba.com) is an amazing software company that creates and maintains impressive Mac apps for doing cool stuff with audio. I bought and use [Loopback](https://rogueamoeba.com/loopback/) years ago, but hit up against its $99 paywall when installing it on a new computer and thought to myself:

> "All I need is a virtual audio device that I can route a few inputs into and control the channel mapping on the way out. Shouldn't be too hard..."

One prompt later I had my very own an app called *Loop* up and running on my machine that does exactly that. I spent a few minutes having Claude wire up some niceties for me and now it *just works*. Great outcome for me. Bad for Rogue Amoeba.[^2]


### What it all means 🧐

The era of personal software[^3] has arrived, and there are large, well-capitalized companies racing to be the one (or few) who makes it evenly distributed. For the rest of software makers, I fear this is the beginning of the end. We best spend our time finding ways to either:

1. Become the system of record for a meaningful subset of people
2. Help people host, integrate, secure, and observe their personal software

Like so many things since the ChatGPT Moment, this is both exciting and terrifying. One of my most deployed refrains about our industry has been: 

> "The only thing that's constant is change." 

Still true, but it's quickly ceding ground in my verbal répertoire to: 

> "The only thing that's certain is uncertainty."


[^1]: Thank you to Adam Curry and Dave Jones for giving me a name for this during [a recent Podcasting 2.0 board room](https://podcastindex.org/podcast/920666?episode=61505688950)

[^2]: I can go spend that $99 I saved on half a tank of gas instead 🙃

[^3]: In this post I'm applying "personal" to individuals, but it works with groups just as well
