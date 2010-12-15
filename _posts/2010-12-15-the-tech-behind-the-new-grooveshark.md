---
layout: post
published: true
title: "The Tech Behind the New Grooveshark"
excerpt: "In which I pay respect to the many open source libraries we used as foundation for Grooveshark's new web-based player."
---

I recently enjoyed the opportunity to help [Grooveshark][gs] reinvent their web interface. There are many things I could say about this project, but if I were limited to a summary statement it would be that we stood on the shoulders of one giant open source community.

This post is my thanks to the authors and contributors of the software used. We probably _could have_ done it without you, but I'm sure glad we didn't have to!

### [jQuery][jquery]

[Yehuda Katz][wycats] recently quipped that [jQuery][jquery] is becoming the standard library of the web. And why shouldn't it? It makes otherwise arduous DOM manipulation a breeze, its API is mature, and it has been proven on major production sites.

jQuery's other strength is its popularity. Some people dislike it for this reason, but I believe it is of real value. One of Grooveshark's goals for the rewrite was to improve designer/developer accessibility. Mission accomplished. There is no other JavaScript library on Earth that more people feel comfortable using.

In fact, Grooveshark had already chosen jQuery as a component before I joined the party. I didn't complain :)

### [jQuery UI][jqueryui]

You may not notice [jQuery UI][jqueryui] in the mix at first glance, but it's in there.

![the new Grooveshark][newgs]

The only widgets used were Autocomplete, Slider, and Datepicker, but we employed a bevy of its other features. It drives all drag and drop interaction on the site as well as enabling the use of another big component: SlickGrid (see below).

One of jQuery UI's greatest advantages (besides its use of jQuery, of course) is that you can pick and choose just what you need. Page load speed was another driving force of the rewrite, so this was paramount for us.

### [JavaScript MVC][jmvc]

Grooveshark's Flash application was built with a [Model-View-Controller][mvc] (MVC) architecture and they were keen on retaining that paradaigm with the JavaScript application. We looked at a few options for this and ultimately settled on [JavaScript MVC][jmvc] (JMVC).

JMVC has a boatload of features (code generation, dependency resolution, documentation, etc.), but we ended up building just upon the core functionality it exposes. At its base is John Resig's [Simple Class inheritance][class], which is key. From there JMVC provides base Model and Controller classes from which you inherit. JMVC controllers are great and with full fledged classical inheritance at our disposal we could extend it to fit all of our needs.

JMVC's default templating engine is [EJS][ejs], which will look familiar to Ruby/Rails developers. Its similarity to vanilla HTML made it attractive right out of the gate (again, for developer accessibility) and powerful features like partials and view helpers means it can handle just about anything.

### [SlickGrid][slickgrid]

A huge component of Grooveshark is the grid. Almost every content page has it, and it is busting at the seams with features (sorting, arbitrary row rendering, drag and drop, keyboard navigation, etc.).

![Grooveshark's Slick Grid][gsgrid]

Features aside, the main thing the grid needs is to perform well with thousands of rows. Thankfully, [SlickGrid][slickgrid] had crossed my radar a few months before the project began. Its adaptive virtual scrolling allows it to scale to hundreds of thousands of rows without losing responsiveness.

The library was a joy to work with. You should definitely check it out if you have advanced grid needs.

### [jQuery Hashchange][hashchange]

Grooveshark is a single page application with many "pages" inside it. These pages have pretty URLs nested behind a hash (#) tag. We needed to preserve all of the publicly available URLs while providing back button and history support. Originally, we looked to [Sammy JS][sammy] for this functionality.

Sammy worked great for awhile, but we had some issues with back button support on older browsers. Also, Sammy provides a ton of functionality and we were only using a smidgeon of it. Instead, we switched to Ben Alman's [Hashchange plugin][hashchange] and never looked back. It works great and has a small footprint.


### [Store.js][storejs]

Performance is a big deal to the Grooveshark team. We use local storage to persist user settings and libraries so they won't have to wait on the server to load up the application when they return. [Store.js][storejs] is a local storage wrapper that consolidates all the browser quirks into a single API. Awesome stuff.

### [jQuery-localize][localize]

Grooveshark currently supports switching between 17 languages. When the language is switched all localized elements on the page (and future elements) need to be swapped out. Our localization technique started with the [jquery-localize][localize] plugin. We ended up extending it quite a bit to support some advanced string localizations, but the plugin definitely gave us a jumping off point.

### Other Stuff

Those are the big pieces of the application, but there are other players that are worth mentioning:

* [PubSub][jqpubsub] &mdash; communicating between disparate sections of the app
* [jquery.hotkeys][hotkeys] &mdash; keyboard shortcuts ftw
* [jjmenu][jjmenu] &mdash; context menus
* [JSON][json] &mdash; pretty much the best thing ever, duh
* [Underscore][underscore] &mdash; not used directly, but we yoinked a few functions from it
* [Yaml][yaml] &mdash; dependency management and configuration
* [Rake][rake] &mdash; build and deploy routines
* [Closure Compiler][closure] &mdash; JavaScript minification
* [JSLint][jslint] &mdash; keep our codes pretty
* [Smusher][smusher] &mdash; optimize images without installing ImageMagick

---

If you authored or contributed to any of the projects listed above: **THANKS!!**

If you are interested in any of them or have questions about how we implemented other pieces of the application, please do ask.

Oh yeah, there is One More Thing&reg;. If you're a Grooveshark user, [friend][gsfollow] me up. [My community is weak][gscommunity]!

[gs]:http://listen.grooveshark.com
[newgs]:http://jerodsanto.net/drop/new-grooveshark-20101213-215629.jpg "The New Grooveshark"
[gsgrid]:http://jerodsanto.net/drop/new-grooveshark-grid-20101214-164846.jpg "Grooveshark's Slick Grid"
[oldgs]:http://retro.grooveshark.com
[jquery]:http://jquery.com
[jqueryui]:http://jqueryui.com
[mvc]:http://en.wikipedia.org/wiki/Model-View-Controller
[cappuccino]:http://cappuccino.org
[jmvc]:http://www.javascriptmvc.com/
[class]:http://ejohn.org/blog/simple-javascript-inheritance/
[ejs]:http://embeddedjs.com/getting_started.html
[slickgrid]:https://github.com/mleibman/SlickGrid/wiki
[hashchange]:http://benalman.com/projects/jquery-hashchange-plugin/
[sammy]:http://code.quirkey.com/sammy/
[storejs]:https://github.com/marcuswestin/store.js
[jqpubsub]:https://github.com/phiggins42/bloody-jquery-plugins
[localize]:https://github.com/coderifous/jquery-localize/
[json]:http://www.json.org/
[underscore]:http://documentcloud.github.com/underscore/
[yaml]:http://www.yaml.org/
[rake]:http://rake.rubyforge.org/
[closure]:http://code.google.com/closure/compiler/
[jslint]:http://www.jslint.com/
[smusher]:https://github.com/grosser/smusher
[hotkeys]:https://github.com/tzuryby/jquery.hotkeys
[jjmenu]:http://jursza.net/dev/jjmenu/
[gscommunity]:http://listen.grooveshark.com/#/user/sant0sk1/417270/community/fans
[gsfollow]:http://listen.grooveshark.com/#/user/sant0sk1/417270/
[wycats]:http://twitter.com/wycats
