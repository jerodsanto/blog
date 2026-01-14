---
title: Brew Install Vim
date: '2011-08-04'
categories:
- ecosystem
draft: false
---

OS X users who prefer command-line Vim over MacVim (I'm sure we're few and far between) may become frustrated with the lack of features enabled in Apple's stock `/usr/bin/vim`. For me, seeing `-clipboard` and `-ruby` in my `vim --version` just wasn't gonna cut it.

Turning to [Homebrew "proper"][homebrew-proper] for a solution would only further that frustration:

```console
brew search vim

If you meant `vim' precisely:

Apple distributes vim with OS X, you can find it in /usr/bin.
```

Thankfully, there's a great [unofficial repository][homebrew-alt] of alternative Homebrew formulae to fill the void!

In it is a formula that will compile a feature-rich version of Vim. You can install it by cloning the repo and pointing to the formula on your local file system or by simply pointing `brew install` at the raw URL, like so:

```console
brew install https://raw.github.com/adamv/homebrew-alt/master/duplicates/vim.rb
```

Seriously, do it. Do it. DO IT.

<div style="width: 560px; margin: 0 auto;">
<iframe width="560" height="349" src="http://www.youtube.com/embed/JoqDYcCDOTg" frameborder="0" align="center"></iframe>
</div>

[homebrew-proper]:http://mxcl.github.com/homebrew/
[homebrew-alt]:https://github.com/adamv/homebrew-alt
