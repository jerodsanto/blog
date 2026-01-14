---
title: Find Your Fiji
date: '2015-01-26'
categories:
- announcement
draft: false
---

I watched The [Truman Show](http://www.imdb.com/title/tt0120382/) again recently. I always loved Truman's romanticization of Fiji. He believed it was exactly half way around the world from his little town.

That got me thinking. What is half way around the world from *me*?

## Static Showdown

When I heard about [Static Showdown](http://2015.staticshowdown.com), Yet another 48 hour programming competition, but with a [static](http://www.staticapps.org) twist, I used it as an excuse to build my little [Fiji Finder][fiji] [^1].

[![That's Pandloi, India, btw](http://jerodsanto.net/drop/fyf-screencap.jpg)][fiji]

## Constraints

There's not much to it. Use the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) to find out where people are and then find the point half way around the world. The math isn't even all that interesting. So I set a few constraints for myself:

1. [Vanilla JS](http://vanilla-js.com) &mdash; I would keep it lean and mean. No jQuery, even.
2. No libraries &mdash; I would write every line of code.
3. Regular Life &mdash; I wouldn't skip get-togethers, church, playing with the kids, etc.

## Challenges

There were a couple of challenges, though. The biggest one is that the Earth's surface is 71% water. That means most of our Fijis (mine included) would be pretty boring. I needed to detect water and adjust.

This would be easy if Google's Maps API would include some kind of `terrain` attribute. Or even better, an `isWater` flag! Sadly, there's no such thing which means we're left to hack together solutions. I found some pretty bizarre advice  on Stack Overflow[^2] like checking for elevation and declaring anything under sea level as water. Terrible, terrible idea.

Finally I came across [this awesome hack](https://tech.bellycard.com/blog/where-d-the-water-go-google-maps-water-pixel-detection-with-canvas/) which I ended up modifying and using. Here's how it works:

1. Take the latitude/longitude that you're trying to detect water from
2. Use the [Static Maps API](https://developers.google.com/maps/documentation/staticmaps/) to get a small image of the location
3. Disable all features of the map *except* water, which is set to green
4. Download the image of the map and add it to an in-memory `canvas` element
5. Read the image data from the `canvas` element and check if it's green
6. Green = water, anything else = land

Crazy, huh? Here's the function I ended up with:

```javascript
function detectWater(ll) {
  var water = new Image();
  water.crossOrigin = "http://maps.googleapis.com/crossdomain.xml";
  water.src = "http://maps.googleapis.com/maps/api/staticmap?&center=" + ll.toUrlValue() + "&zoom=13&size=100x100&sensor=false&visual_refresh=true&style=element:labels|visibility:off&style=feature:water|color:0x00FF00&style=feature:transit|visibility:off&style=feature:poi|visibility:off&style=feature:road|visibility:off&style=feature:administrative|visibility:off";

  var waterCanvas = document.createElement("canvas");
  waterCanvas.setAttribute("width", 100);
  waterCanvas.setAttribute("height", 100);
  waterCanvas = waterCanvas.getContext("2d");

  water.onload = function() {
    waterCanvas.drawImage(water, 0, 0, 100, 100);
    var bytes = waterCanvas.getImageData(50, 50, 1, 1).data;

    if (bytes[1] === 254) {
      ll.isLand = false;
    } else {
      ll.isLand = true;
    }
  }
};
```

So when I find your Fiji and detect that it's water, I head due north 500 km and detect another one. Rinse and repeat until we hit land. It ain't perfect[^3], but it is good enough.

The other challenge, oddly enough, was adding a few decent looking modal dialog boxes. I use libraries for those all of the time and I felt like quite the neophyte trying to implement it on my own. In fact, I was quickly running out of time [^4] so I hacked together a butt-nasty solution.

## Takeaways

It's fun to conceive an idea and be able to bring it to life in just a couple of days. I'm often disappointed when I do hackathons because project scopes are often too large for the time allotted. This was just enough work to challenge me while still being able to finish.

The end product is by no means perfect, but just like Fiji, it's less about the final destination and more about how far you have to travel to get there.

[^1]: I had no illusion of winning the contest, but I was working alone so I thought *maybe* I'd be in the running for the solo prize. Then I saw [this entry](http://2015.staticshowdown.com/teams/spacetme), which destroyed all hope for me.
[^2]: As you do

[^3]: It will skip over islands that are smaller than 500 km. But it was either that or fire off way too many Static Maps API calls (Google was throttling me).

[^4]: Not competition time. I had plenty of that. But I had to go to my parents' for dinner soon!


[fiji]: http://fiji.jerodsanto.net
