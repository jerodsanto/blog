---
layout: post
published: true
title: "A Better Way to Get Recency-based Google Searches in Chrome"
excerpt: "Last week I shared my Dotjs hack which forces Chrome's Omnibar searches to use Google's \"past year\" parameter. Since then I've learned a couple of things and found a better way of handling it."
---

Last week I shared [my Dotjs hack][dotjshack] which forces Chrome's Omnibar searches to use Google's "past year" parameter. Since then I've learned a few things:

1.	My JavaScript-based solution creates a blip effect because the page first loads a regular search and then immediately updates to load the "past year" search. That blip is annoying.
2.	Even though I quite often want a recency-based search, there are plenty of times that I don't. I'd rather opt-in than opt-out.
3.	There is [probably a better way][helpful-comment].

I Combined those new bits of knowledge and came up with a better way to get recency-based Google searches in Chrome: _add a custom search engine_.

Here's how.

1.	Open Chrome's preferences and navigate to Basics => Search => Manage Search Engines
2.	Add a new search engine under the list of "Other search engines" with the following values.

**Name:** "Google (recent)" or whatever makes sense to you

**Keyword:** "recent" or something else short and easily typed

**URL:** http://www.google.com/search?q=%s&tbs=qdr:y&tbo=1

See my list of other search engines below:

![other search engines][other-search-engines]

When you want to use it, start typing the search engine's keyword into the Omnibar and hit the "tab" key. Chrome will select the appropriate search engine.

![recent search example][google-recent-search]

That's all there is to it. Better, no?


[dotjshack]:/2011/07/my-dotjs-hack-to-default-google-searches-to-past-year/
[helpful-comment]:http://blog.jerodsanto.net/2011/07/my-dotjs-hack-to-default-google-searches-to-past-year/#comment-266238490
[other-search-engines]:http://jerodsanto.net/drop/other-search-engines-20110802-084545.jpg
[google-recent-search]:http://jerodsanto.net/drop/google-recent-search-20110802-083728.jpg
