---
title: Reflections on Reflections on Trusting Trust
stab:
slug:
date: 2026-09-15T21:47:45.624Z
image: reflections-on-reflections.jpg
draft: false
---
As I made my way through [Socket's](https://jerodsanto.net/2026/09/joining-socket/) onboarding materials, I was pleasantly surprised to see Ken Thompson's [Reflections on Trusting Trust](https://dl.acm.org/doi/epdf/10.1145/358198.358210) in the list of required reading. I read this essay as part of my course work over 20 years ago[^1] and hadn't thought about it much since. It's so good! And concerning.

This time around, I pulled a few quotes and jotted down a few notes as I went. Starting with...

> In college, before video games, we would amuse ourselves by posing programming exercises. One of the favorites was to write the shortest self-reproducing program.

Thompson was making [quines](https://en.wikipedia.org/wiki/Quine_(computing)) before we even called them quines.

>If this were not deliberate, it would be called a compiler "bug." Since it is deliberate, it should be called a "Trojan horse."

The only difference between a bug and a Trojan horse is intent.

> First we compile the modified source with the normal C compiler to produce a bugged binary. We install this binary as the official C. We can now remove the bugs from the source of the compiler and the new binary will reinsert the bugs whenever it is compiled. Of course, the login command will remain bugged with no trace in source anywhere.

[Clever girl](https://www.youtube.com/watch?v=plzw1NWVYSM). Here comes the big moral/takeaway:

> You can't trust code that you did not totally create yourself. (Especially code from companies that employ people like me.) No amount of source-level verification or scrutiny will protect you from using untrusted code.

This aged so well that it hits me the same way it hit me 20 years ago. *We are all doomed.* The only part that didn't age well is the closing, in which Thompson criticizes the media's coverage of "hackers"

> I have watched kids testifying before Congress. It is clear that they are completely unaware of the seriousness of their acts. There is obviously a cultural gap. The act of breaking into a computer system has to have the same social stigma as breaking into a neighbor's house. It should not matter that the neighbor's door is unlocked. The press must learn that misguided use of a computer is no more amazing than drunk driving of an automobile.

Those were clearly simpler times. We've since seen [some](https://www.csoonline.com/article/562691/stuxnet-explained-the-first-known-cyberweapon.html) [amazing](https://www.controleng.com/throwback-attack-how-notpetya-accidentally-took-down-global-shipping-giant-maersk/) [misuses](https://www.solarwinds.com/blog/an-investigative-update-of-the-cyberattack) of computers. If we couldn't trust other people's code back in 1984 when this was written, what chance do we stand now?

[^1]: I majored in M.I.S. and minored in C.S., but spent my last two years at UNO getting a concentration in "Information Assurance" as part of an NSF scholarship from NUCIA [(now NebraskaCYBER)](https://www.unomaha.edu/college-of-information-science-and-technology/engagement/centers/nebraska-university-center-for-information-assurance/about/history.php). That program had a lengthy reading list, which I appreciated a little then and *a lot* now.