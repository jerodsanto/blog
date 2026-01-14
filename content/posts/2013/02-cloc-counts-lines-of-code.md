---
title: CLOC Counts Lines of Code
date: '2013-02-12'
categories:
- ecosystem
draft: false
---

If you ever find yourself in a foreign code base and want to get a quick overview of exactly how much code is in it, [CLOC][cloc] is just the tool for the job.

It's easy to install on OS X:

```console
$ brew install cloc
```

And on Debian-based Linuxes:

```console
$ aptitude install cloc
```

To use it, simply `cd` into the root directory and run:

```console
$ cloc .
```

The default output will show you a breakdown by language. Here's an example of what it'll look like:

[![php much?][cloc-redacted]][cloc]

You can, of course, customize the poop out of it as well.

`cloc --help` to nerd out.

[cloc]:http://cloc.sourceforge.net
[cloc-redacted]:http://jerodsanto.net/drop/cloc-redacted.png
