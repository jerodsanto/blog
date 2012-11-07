---
layout: post
published: true
title: "Bridging the Gap Between JavaScript's console.log and Cocoa's NSLog"
excerpt: "Working with JavaScript inside of a WebKit WebView can be tricky because bare-bone WebViews don't ship with the handy, dandy developer console that is available in Safari and Chrome. In this post, I outline how to get your JavaScript console.logs to show up in Xcode's Debugger Console using NSLog."
---

[Cocoa's WebViews][webview] provide a [scripting object][scriptobject] through which you can execute JavaScript from Objective-C and Objective-C from JavaScript.

Unfortunately, getting feedback from the JavaScript executed inside a `WebView` is not totally straight forward. Exceptions are converted into `undefined`s (more on that [here][undefineds]) and you can only get back a single return value to use for debugging.

Wouldn't it be neato if you could just continue using `console.log()` calls from inside JavaScript like you're used to and have the output displayed in Xcode's Debugger Console? Good news, folks. You can! Here's how:

First, set a `frameLoadDelegate` for your `WebView`. I'll just use the application delegate to keep the example simple.

{% highlight objc %}
#import "MyAppDelegate.h"

@implementation MyAppDelegate

@synthesize webView, scriptObject;

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    [webView setFrameLoadDelegate:self];
    [webView setMainFrameURL:@"http://blog.jerodsanto.net"];
}
{% endhighlight %}

The delegate method to employ is `-webView:didFinishLoadForFrame`. This will be called after each frame in the `WebView` is loaded. Since you only want to set up the bridge once, check that the frame that was just loaded is named "_top" ([more info][webframe]).

{% highlight objc %}
- (void)webView:(WebView *)sender didFinishLoadForFrame:(WebFrame *)frame {
    if (frame == [frame findFrameNamed:@"_top"]) {
        // bridge code will go here
    }
}
{% endhighlight %}

Once inside the `if` statement, the scripting environment is totally initialized. Get a reference to the scripting object:

{% highlight objc %}
scriptObject = [sender windowScriptObject];
{% endhighlight %}

Now, register your object so its methods can be called from JavaScript:

{% highlight objc %}
[scriptObject setValue:self forKey:@"MyApp"];
{% endhighlight %}

At this point, the instance of `MyAppDelegate` is accessible to JavaScript as `window.MyApp` and its methods can be called from JavaScript! Well, not just yet...

For safety reasons, you have to opt-in your Objective-C methods to be executable from JavaScript. First, add the method that will be called. It will simply take the message string from JavaScript and pass it to `NSLog`.

{% highlight objc %}
- (void)consoleLog:(NSString *)aMessage {
    NSLog(@"JSLog: %@", aMessage);
}
{% endhighlight %}

Okay, the method is defined. Now it has to be made explicitly available to JavaScript by implementing a class method called `isSelectorExcludedFromWebScript`:

{% highlight objc %}
+ (BOOL)isSelectorExcludedFromWebScript:(SEL)aSelector {
    if (aSelector == @selector(consoleLog:)) {
        return NO;
    }

    return YES;
}
{% endhighlight %}

All that is left now is to define/override the `window.console` object which will bridge its `log` function to the exposed `MyAppDelegate` object's `consoleLog` method:

{% highlight objc %}
[scriptObject evaluateWebScript:@"console = { log: function(msg) { MyApp.consoleLog_(msg); } }"];
{% endhighlight %}

That's all there is to it! Here is the example `MyAppDelegate.m` in its entirety:

{% highlight objc %}
#import "MyAppDelegate.h"

@implementation MyAppDelegate

@synthesize webView, scriptObject;

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    [webView setFrameLoadDelegate:self];
    [webView setMainFrameURL:@"http://blog.jerodsanto.net"];
}

- (void)consoleLog:(NSString *)aMessage {
    NSLog(@"JSLog: %@", aMessage);
}

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)aSelector {
    if (aSelector == @selector(consoleLog:)) {
        return NO;
    }

    return YES;
}

- (void)webView:(WebView *)sender didFinishLoadForFrame:(WebFrame *)frame {
    if (frame == [frame findFrameNamed:@"_top"]) {
        scriptObject = [sender windowScriptObject];
        [scriptObject setValue:self forKey:@"MyApp"];
        [scriptObject evaluateWebScript:@"console = { log: function(msg) { MyApp.consoleLog_(msg); } }"];
    }
}

@end
{% endhighlight %}

Once you have this set up you can use `console.log`s to your heart's desire and get the feedback you need right there in Xcode. If there is an easier/better way, please do let me know. Hope this helps!

[webview]:http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/WebKit/Classes/WebView_Class/Reference/Reference.html
[scriptobject]:http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/WebKit/Classes/WebScriptObject_Class/Reference/Reference.html%23//apple_ref/doc/c_ref/WebScriptObject
[undefineds]:http://www.thimbleby.net/script/
[webframe]:http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/WebKit/Classes/WebFrame_Class/Reference/Reference.html%23//apple_ref/doc/c_ref/WebFrame

