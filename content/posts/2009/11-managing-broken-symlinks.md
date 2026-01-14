---
title: Managing Broken Symlinks
date: '2009-11-05'
categories:
- sysadmin
draft: false
---

I just added two new functions to my [bashrc][1] which make it super-simple to find & remove broken symbolic links on your system.

They're simple wrappers around the ever-useful "find" utility:

```bash
function find_broken_symlinks() { find -x -L "${1-.}" -type l; }
function rm_broken_symlinks() { find -x -L "${1-.}" -type l -exec rm {} +; }
```

You can call the functions with a specific path:

```console
jerod@mbp:~$ find_broken_symlinks /usr/local/bin
```

Or you can call them sans argument to search your current working directory:

```console
jerod@mbp:~$ find_broken_symlinks
```

Enjoy!

[1]:http://github.com/jerodsanto/dotfiles/blob/master/bashrc
