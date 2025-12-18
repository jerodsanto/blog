---
title: 'jQuery: Set Mouse Focus On Page Load'
date: '2009-05-09'
categories:
- development
draft: false
---

## First Input:

```js
$(document).ready(function() {
  $('input:text:first').focus();
});
```

## First Empty Input:

```js
$(document).ready(function() {
  $('input:text[value=""]:first').focus();
});
```
