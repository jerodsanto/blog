---
title: Rename A Gitosis Repository
date: '2009-05-28'
categories:
- sysadmin
draft: false
---

I use [gitosis][1] for private git repository hosting (and it's awesome). If you are interested, this[ great tutorial][2] will walk you through setting it up yourself.

I recently needed to rename one of my repositories and couldn't find any info on how to do it, so here is a walk-thru. I will demonstrate the steps of renaming a repository called "**tk**" to "**show-time**".


Rename project in gitosis.conf

Before:

```console
[group main]
writable = tk
```

After:

```console
[group main]
writable = show-time
```

Push changes

```console
git push origin master
```

Connect to gitosis server and rename correct folder

```console
cd /home/git/repositories
mv tk show-time
```

Change the remote reference in all repository clones

```console
cd /src/show-time
git remote rm origin
git remote add origin git@example-git-server.com:show-time.git
```

Done and done.

[1]: http://eagain.net/gitweb/?p=gitosis.git;a=summary
[2]: http://scie.nti.st/2007/11/14/hosting-git-repositories-the-easy-and-secure-way
