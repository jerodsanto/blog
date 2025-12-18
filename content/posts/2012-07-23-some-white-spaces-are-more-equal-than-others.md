---
title: Some White Spaces are More Equal Than Others
date: '2012-07-23'
categories:
- development
draft: false
---

Let's not argue about tabs vs. spaces. Let's argue about spaces vs. spaces!

Some developers use four spaces to represent one unit of indentation. Others prefer two spaces instead. Which is better? Is there such a thing as better, or is it *just* a matter of taste?

{{< aside "notice" >}}
I've heard rumor of some crazies who use eight spaces for indentation, but I'm fortunate enough not to have encounterd one in the wild.
{{< /aside >}}

I submit that the correct answer is almost always two spaces, with one exception where four spaces wins out. Here's why.

## Common ground

The underlying principle is that code is written once and read many times, therefore the goal of the writer is to optimize for legibility.

If you don't share this goal with the rest of us, you can stop reading and go back to your day job. Also, I hope your day job does not involve writing code!

## The de facto is two spaces

We all learned in Legibility 101 that there is a point at which squeezing more characters on the same line makes the text harder to read. If you played hookie that day, just find a fluid width website and stretch your browser horizontally as far as you can. Now try to read the text. Harder, huh?

The form factor of printed books has been optimized for decades and the verdict is in: ~60 characters per line is the sweet spot.

This reason &mdash; not the oft cited reason of accounting for legacy technologies &mdash; is why I believe that having an 80 character per line limit on your code is a good idea.

{{< aside "notice" >}}
This constraint introduces other benefits, such as 1) easily fitting two columns of code side-by-side in your editor and 2) providing a nice warning sign of code complexity.
{{< /aside >}}

But we need to be able to express ourselves inside those 80 characters and indentation takes up precious real estate. Therefore, the ideal number of white spaces used for indentation is the minimum number that we can get away with while still being recognizable: hence, two spaces for indentation is my de facto standard.

No standard would be de facto if there weren't exceptions, and I believe we have one exception to carefully consider.

## The exception is four spaces

When it comes to white space, there are two kinds of programming languages: ones in which white space is insignificant and ones in which white space is significant.

{{< aside "notice" >}}
Okay, so there's a third kind too. <a href="http://en.wikipedia.org/wiki/Whitespace_(programming_language)">Whitespace</a>, in which the white spaces <em>are</em> the programming language. But when cheese stands all alone it's usually because it smells funky.
{{< /aside >}}

Popular languages with significant white space include [Python][python], [Haskell][haskell], [CoffeeScript][coffeescript], and [Sass][sass].

These languages rely on white space in their very syntaxes and don't have other means of indentation. This makes it very reasonable, and even preferrable, to let their significant white space be more *significant* in form than in other languages.

White space significant languages get four spaces per unit of indentation.

## Painting the ole' bike shed?

Yeah, maybe so. But it's one of those decisions that all developers have to deal with so it's nice to have a system that makes sense. Your proverbial mileage may vary.

Oh, and one more thing. When you are contributing to somebody else's project, just swallow your pride and adopt whatever style they prefer. It could be the difference in getting your contributions accepted or not.

[python]:http://www.python.org/
[haskell]:http://www.haskell.org/haskellwiki/Haskell
[coffeescript]:http://coffeescript.org/
[sass]:http://sass-lang.com/
