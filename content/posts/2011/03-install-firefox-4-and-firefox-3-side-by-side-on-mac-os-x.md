---
title: Install Firefox 4 and Firefox 3 Side by Side on Mac OS X
date: '2011-03-23'
categories:
- hack
draft: false
---

Want to upgrade to the newly released Firefox 4 while maintaining your Firefox 3 install for browser testing purposes? So did I. Here's how to get 'er done:

## 1) Rename Firefox 3's app bundle

You don't want the Firefox 4 install to clobber the Firefox 3 install which it will if you don't rename it first. Use Finder to rename it or execute this from the terminal:

```console
mv /Applications/Firefox.app /Applications/Firefox3.app
```

## 2) Create version-specific profiles

Skip this step if you don't care about your current Firefox 3 profile.

You need to rename your current profile (probably **default**) and create a new profile for Firefox 4 to use. Use the [Profile Manager][manager] to accomplish this. Quit Firefox if it's running and run this command from your terminal:

```console
/Applications/Firefox3.app/Contents/MacOS/firefox-bin -ProfileManager
```

Rename the the default profile to "firefox3" (or similar) and create a new profile called "firefox4" (or similar). If you're cool with selecting the profile to use every time you launch one of the browsers, just uncheck "Don't ask at startup" and jump down to step 5. If you're **not** cool with that, make sure it is checked and read on.

## 3) Force Firefox 3 to use its own profile when launched

This is more work than I anticipated, but [this blog post][forceprofile] explains it pretty well. Create a script called "firefox.sh" (or similar) in `/Applications/Firefox3.app/Contents/MacOS` and paste the following into it:

```bash
#!/bin/sh

MYDIR=`dirname "$0"`
cd "${MYDIR}"
./firefox-bin -P "firefox3" "$@"
```

Then edit `/Applications/Firefox3.app/Contents/Info.plist` and change the `Root/CFBundleExecutable` string to "firefox.sh".

Finally, rebuild your launch services database so it picks up the changes by executing this command:

```console
/System/Library/Frameworks/CoreServices.framework/Versions/A/Frameworks/LaunchServices.framework/Versions/A/Support/lsregister -kill -r -domain local -domain system -domain user
```

## 4) Install Firefox 4 like normal

Yup, just [Get Firefox 4][getfirefox] and install it. You should now be able to run them side by side with their unique profiles!

![side by side][sidebyside]

Bingo. Bango. Bongo.

[manager]:http://support.mozilla.com/en-US/kb/Managing%20profiles
[forceprofile]:http://nxsy.org/firefox-30b4-and-multiple-firefox-versions-on-os-x
[getfirefox]:http://getfirefox.com
[sidebyside]:http://jerodsanto.net/drop/firefox-3-and-4-20110323-093818.png "Firefox 3 and Firefox 4 side by side"
