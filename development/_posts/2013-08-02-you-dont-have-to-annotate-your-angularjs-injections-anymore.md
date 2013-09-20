---
layout: post
published: true
title: "You don't have to annotate your AngularJS injections anymore"
excerpt: "So please stop"
---

One unfortunate drawback of how [AngularJS's][angular] dependency injection works is that it breaks when your code is minified. The reason it fails is that minification renames variables that Angular uses to resolve the dependencies.

So the natural way of injecting dependencies into a controller doesn't work:

{% highlight js %}
app.controller("MyCtrl", function($scope, $http, MyService) {});
{% endhighlight %}

The minifier renames `$scope`, `$http`, and `MyService` (in order to, ahem, minify them) and the injection breaks.

The old answer to this problem (which you will still see people promoting) is to "annotate" your injections. At every injection point you pass in an array that resolves the variable/injection pair manually.

The above code changes to this:

{% highlight js %}
app.controller("MyCtrl", ["$scope", "$http", "MyService", function($scope, $http, MyService) {}]);
{% endhighlight %}

I'm sorry but that code is just crazy town.

Thankfully, there is no longer a good reason to manually annotate your injections. Just make the computer do it for you by utilizing Brian Ford's excellent [ngmin][ngmin].

The tool is available as a grunt task via [grunt-ngmin][grunt-ngmin] and in Rails' asset pipeline via [ngmin-rails][ngmin-rails] so you can integrate it easily into your build process and avoid the headache and ugliness that is manual dependency injection annotations.

So please do.

[angular]:http://angularjs.org
[ngmin]:https://github.com/btford/ngmin
[grunt-ngmin]:https://github.com/btford/grunt-ngmin
[ngmin-rails]:http://rubygems.org/gems/ngmin-rails
