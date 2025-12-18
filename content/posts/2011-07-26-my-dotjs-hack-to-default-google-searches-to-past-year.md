---
title: My Dotjs Hack to Default Google Searches to Past Year
date: '2011-07-26'
categories:
- hack
draft: false
---

{{< aside "alert" >}}
UPDATE: I've since moved to [a better way](/2011/08/a-better-way-to-get-recency-based-google-searches-in-chrome/) of doing this. Please read that first/instead.
{{< /aside >}}

Sick of clicking on "More tools" and "Past year" after almost all of your Google searches? I was, so I hacked together a [dotjs][dotjs] quickie which adds the necessary params if they aren't already provided.

{{< aside "notice" >}}
Disclaimer: this has only been tested on searches performed from the omnibar. I can't remember the last time I visited google.com.
{{< /aside >}}

First, use Chrome as your browser. Next, install dotjs. Finally, drop this snippet into `~/.js/google.com.js`:

```javascript
if (window.location.pathname == "/search") {
  if (!window.location.href.match("&tbs=")) {
    window.location.href += "&tbs=qdr:y&tbo=1";
  }
}
```

If you prefer your timely searches to be constrained differently, change the `tbs` param as follows:

* month = qdr:m
* week  = qdr:w
* day   = qdr:d

Recency is a big deal. One of these days Google will allow this as a setting in our search preferences. Until then, JavaScript FTW!

[dotjs]:http://defunkt.io/dotjs/
