---
title: PHP5 with readline support on OS X
date: '2009-06-06'
categories:
- sysadmin
draft: false
---

OS X ships with PHP5 installed but it does not have `readline()` support compiled in. Anybody using PHP from the command-line will want this, as it allows handy things such as tab completion and scrolling through command history using the up arrow.

Thankfully, [MacPorts][1] has a readline variant that can be easily installed:

```console
sudo port install php5 +readline
```

If you execute the command above, apache2 will come along for the ride because it's a default variant for the PHP5 port. If you don't want apache2 (OS X ships with apache2 anyways), modify the command to look like this:

```console
sudo port install php5 -apache2 +readline
```

Not sure if your PHP install has readline support? Execute this one-liner to find out:

```php
<?php echo function_exists('readline') ? "yes\n" : "no\n"; ?>
```

[1]: http://www.macports.org/
