---
title: Confessions of a Meteor Newb
date: '2012-04-23'
categories:
- development
draft: false
---

I recently took part in the first (annual, I hope) [Hack Omaha][hackomaha] competition. I teamed up with the ridiculously talented [Zach Leatherman][zachleat] to create [Omaha Bounty Hunter][omahabountyhunter], a web-based The-Price-is-Right-style game using the provided [Property Crime][propertycrime] data set.

[<img src="http://www.omahabountyhunter.com/obh-logo.png" alt="Omaha Bounty Hunter" style="background: black">][omahabountyhunter]

As Zach and I were getting started, we were lamenting how timed coding competitions rarely provide opportunity to learn new tricks or try new tech. That's when one of us (I can't recall who) had a crazy idea... let's build this thing with the just-released [Meteor][meteor] JavaScript framework!

And that's exactly what we did. Well, kind of...

Here's how it went down, from a total Meteor Newb's perspective.

## Getting Started

Congrats to the Meteor team for making getting started a breeze. You literally just run:

```console
curl install.meteor.com | /bin/sh
```

and you can start coding a Meteor app. I figured that I'd at least have to have [MongoDB][mongo] installed on my machine (this is the default &mdash; and currently only &mdash; persistence mechanism) before I could start. Nope. They bundle it up and manage the MongoDB server for you seamlessly. Very nice.

{{< aside "notice" >}}
Newb tip: You can hop right into the Mongo shell by typing `meteor mongo` inside your app's root directory.
{{< /aside >}}

The provided `meteor` command has many features right out of the gate, most importantly a `--help` flag for general help and a `meteor help <command>` to learn more about each specific command.

I was excited to see `meteor update` which brings your Meteor install up to the latest release. A young project having an easy update feature baked right in says to me that the devs really thought this through.

I think it's safe to say that Zach and I were both up and running with Meteor in about 15 minutes.

## Packages

One big piece of Meteor is the package system. The good news is that for us the package system just worked. The bad news is that there aren't very many packages in the directory yet. This wouldn't be a probem if Meteor just directly integrated [npm][npm], therefore inheriting its large package index, but I'm sure they had their reasons.

The packages employed by any given Meteor app are listed in `.meteor/packages` and can be installed via:

```console
meteor add <package_name>
```

We used the *less* and *underscore* packages, but I couldn't talk Zach into using the *coffeescript* package. Oh well, there's always next year...

([More info on packages][meteor-packages])

## Getting Help

The [Meteor docs][meteor-docs] are surprisingly good. They definitely didn't answer all of our questions and they definitely need _more_ examples, but what is there is easy to read and organized really well. I can't even complain about the lack of search, because everything is on a single page. Chrome's inline search was sufficient to find anything we needed.

But what happens when the docs aren't cutting it and you have like 30 hours to get this dog hunting? [IRC][meteor-irc], that's what. I had two critical questions answered in #meteor AND they were answered swiftly AND it was a Saturday morning. That's pretty rad.

## Autopublish is the Devil

It's a good thing that getting help was so painless, because boy did we need it! Everything was going peechy until I got the [import script][obh-import] (Yes, Ruby) working and imported slightly over 30,000 records into our `Bounties` collection.

This is where the S really hit the F.

[![You gotta be kidding me][s-hits-the-f]][s-hits-the-f-link]

Meteor dutifully refreshed my browser for me and suddenly Chrome was crushing my CPU. I tried quitting Chrome. Nothing. I tried force quitting Chrome. Nothing. Tried again. Finally, it quit.

What the what?

After restarting Chrome and seeing my CPU spike again, I knew this was not a fluke. I managed to get the Dev Tools open this time to see a 7.8MB XHR request flying down the wire. Yup, the server was sending all 30k+ records down to my client.

You see, one of the reasons that Meteor demos so well is that you can execute arbitrary Mongo queries right in the client. What they don't tell you in the demo (but they will tell you on SO or IRC) is that this works out of the box because of a feature called `autopublish` which does pretty much what it sounds like. If you have more than a few documents in your database you need to disable `autopublish` and you need to disable it right now.

```console
meteor remove autopublish
```

After disabling autopublish I could once again load our app without crashing my browser, but now then there were no items available in the client's representation of the Bounties collection.

## I don't think that word means what you think it means

Once autopublish is out of the picture, you have to manually publish and subscribe in order to get data down to your clients. The way this works in Meteor is, to me, non-intuitive.

First you have to set up a publish on a channel from your server and then you have to subscribe to that channel from your clients. Notice the order there: first you publish, then you subscribe.

This was super weird for us because we wanted to have 2 clients join the same "room" and then have the server publish 5 random bounties down to the clients (we never got this far and thus our game is single player). The way I tried to get this working &mdash; but eventually abandoned &mdash; was to define methods that clients could call to initiate a battle, get a UUID from the server, and then join the channel with that UUID. It looked something like this:

```js
Meteor.startup(function () {
  // code to run on server at startup
  WAITING = [];
  BOUNTY_COUNT = Bounties.find().count();
});

function getRando() {
  return Math.floor(Math.random() * (BOUNTY_COUNT - 1)) + 1;
}

Meteor.methods({
  startSingle: function() {
    return Meteor.uuid();
  },
  startBattle: function() {
    if (WAITING.length) {
      var uuid = WAITING.pop();
    } else {
      var uuid = Meteor.uuid();
      WAITING.push(uuid);
    }

    return uuid;
  },
  join: function(uuid) {
    var randos = [];
    _.times(5, function() { randos.push(getRando()); });
    Meteor.publish("bounties-" + uuid, function() {
      return Bounties.find({rando: {$in: randos}});
    });
  }
});
```

The idea here is that when a user clicked the "Battle Mode" link then they would call `startBattle`, get and store a UUID, and then call `join` with the given UUID. This would subscribe them to a channel and they'd be waiting for an opponent to join with the same UUID.

The two clients would play the game with their 5 bounties and then somehow trigger the server to republish 5 different bounties to play with. The problem with that is what I said before, you have to publish before you subscribe (which, again, doesn't make much sense to me) and you can't republish to the same channel. The server would just need to change the Bounties collection on the channel and both clients would get the new bounties, but how does the server get the handle to the unique channel id?

Now, I may have just been thinking too client-server-y, but I never did figure out how to accomplish this pretty trivial work flow. If any Meteor non-newbs are reading, please post answers in the comments!

We ran out of time to figure out a good way to periodically fetch random bounties, so the end result of the server code is when somebody starts the game it just hands out 50 random bounties. If a user is wicked smart and gets all 50 bounties right, it creates a rift in the space-time continuum and a very naked Arnold Schwarzenegger shows up at their house looking for clothes, boots, and a motorcycle.

[![T2][t2-pic]][t2]

## JavaScript, JavaScript Everywhere

One of the claimed advantages of using entirely JavaScript-based app stacks like Meteor is that you don't have to context switch between a server-side language and a client-side language. I don't think this is a much of a win for a couple of reasons:

1. I find switching between Ruby and JavaScript (esp. CoffeeScript) pretty easy
2. You still have HTML, CSS, and some templating system in play so contexts still need switching quite often

Now, I could be totally wrong and never having to stop to think about which language your code is running in could be a huge win, but with Meteor I experienced a completely different disorienting effect: I kept forgetting *where* my code was running. Is this the client? Is this the server? WHERE AM I?!

It helped to split the implementations up into separate files, but even then there are some Meteor APIs exposed only in the client's context, some exposed only in the server's context, and some exposed in both contexts. Figuring out what stuff was available where was...odd.

{{< aside "notice" >}}
Newb tip: the docs says Client, Server, or Anywhere next to each method so it's not too much work to figure out
{{< /aside >}}

I have a feeling that this is something I'd get used to pretty quickly, but it was frustrating nonetheless.

## Meteor and Mongo, sitting in a tree

MongoDB is tons of fun and I can't wait to use it again. One frustrating thing about using MongoDB from within Meteor is that only a subset of Mongo's JavaScript API is available from inside a Meteor collection. That said, I'm no MongoDB pro so I'm not sure how significant of a subset it is.

([More on Meteor Collections][meteor-collections])

## Deploying

Meteor provides free hosting on one of their subdomains (which is really awesome, btw), but we wanted to use our own domain so we deployed to Heroku instead. This was made relatively painless thanks to [this build pack][meteor-heroku-buildpack]. I had to make a few adjustments to deploy from a subdirectory instead of the root directory (so as to ignore our import script), but other than that it just worked. I've been using Heroku for years and it still impresses me more every time I use it.

## Conclusions, FAQ-style

*Did our Meteor app win the contest?*

Nope. [This awesome app][foodfight] did.

*Would our app have won if we built it on our bread-and-butter tools instead of Meteor?*

Nope. [This awesome app][foodfight] would have.

*Would I use Meteor for a production application?*

Not yet. I'd wait until they have more security features and more example code is available. I'm also concerned about how well Meteor will scale (code-wise) to a very complex application. Hopefully there will be an aggressive, complex, open source Meteor app soon.

*Would I use Meteor for fun, hacks, tech demos, etc?*

Absolutely, but it might be worth checking out [Derby][derby] too.

*Is everything in this blog post absolute truth?*

Absolutely not. When it comes to Meteor I'm a total newb, remember!

[hackomaha]:http://hackomaha.com
[zachleat]:http://www.zachleat.com/web/
[omahabountyhunter]:http://www.omahabountyhunter.com
[propertycrime]:https://hackomaha.socrata.com/Government/CRIME_property/3nfn-ev8i
[obh-pic]:http://www.omahabountyhunter.com/obh-logo.png
[meteor]:http://meteor.com
[npm]:http://npmjs.org/
[meteor-docs]:http://docs.meteor.com/
[meteor-packages]:http://docs.meteor.com/#packages
[meteor-collections]:http://docs.meteor.com/#meteor_collection
[meteor-irc]:http://meteor.com/irc
[mongo]:http://www.mongodb.org/
[obh-import]:https://github.com/jerodsanto/obh/blob/master/import/import.rb
[s-hits-the-f]:http://ecx.images-amazon.com/images/I/418FkFqBrPL.jpg
[s-hits-the-f-link]:http://www.amazon.com/dp/B002AV8UH2/?tag=shoes4all-20
[meteor-heroku-buildpack]:https://github.com/jordansissel/heroku-buildpack-meteor
[derby]:http://derbyjs.com/
[t2-pic]:http://jerodsanto.net/drop/terminator_528_poster-20120423-161807.png
[t2]:http://www.imdb.com/title/tt0103064/
[foodfight]:http://www.siliconprairienews.com/2012/04/food-fight-gamifies-restaurant-ratings-wins-hack-omaha-video

