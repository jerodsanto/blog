---
title: 'jQuery: isInArray Boolean Sugar'
date: '2011-01-31'
categories:
- development
draft: false
---

jQuery has a utility function called `jQuery.inArray` which confounds [many people][forumthread] when they first stumble across it in the [API docs][inarray]. The name implies a boolean return, but the function is really just a proxy in front of `Array.indexOf` to allow for cross-browser use. It returns the index of the value found in the array or -1 if the value is not found.

The bad news is the function name won't be changing anytime soon due to backwards-compatibility. The good news is it's a one-liner to add some syntactic sugar around it for your own use. I call it `isInArray`. `arrayInclude` or `arrayHas` would work too, but they imply an array-first argument order which just adds to the confusion.

```javascript
jQuery.isInArray = function(value, array) {
  return -1 != jQuery.inArray(value, array);
}
```

Why waste precious time and bandwidth adding such functions? Because conditionals that look like this:

```javascript
if (-1 != $.inArray(someValue, someArray))
  console.log('there you are!');

if (-1 == $.inArray(someValue, someArray))
  console.log('there you are not!');
```

carry a lot more mental overhead than conditionals that look like this:

```javascript
if ($.isInArray(someValue, someArray))
  console.log('there you are!');

if (!$.isInArray(someValue, someArray))
  console.log('there you are not!');
```

The value is nominal when used minimally, but these kinds of niceties help keep your application logic semantic when used throughout larger code bases.

[inarray]:http://api.jquery.com/jQuery.inArray/
[forumthread]:http://forum.jquery.com/topic/inarray
