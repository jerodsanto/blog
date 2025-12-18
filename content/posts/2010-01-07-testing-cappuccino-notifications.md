---
title: Testing Cappuccino Notifications
date: '2010-01-07'
categories:
- development
draft: false
---

Writing a web app using [Cappuccino][1] has a lot of benefits, one of which is a really nice message passing system wherein certain objects can register to observe events and take action when other objects post notifications of those events.

Here is a very basic way to test if your app is posting event notifications as you expect it to. First, create an Observer class inside a test helper file, which will be included into your tests:
~

```objj
// this is TestHelper.j
@import <Foundation/CPObject.j>

@implementation Observer : CPObject
{
    CPArray postedNotifications;
}

- (id)init
{
    if (self = [super init])
    {
        postedNotifications   = [CPArray array];
    }
    return self;
}

- (void)startObserving:(CPString)aNotificationName
{
    [[CPNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(notificationPosted:)
                                                 name:aNotificationName
                                               object:nil];
}

- (void)notificationPosted:(id)sender
{
    [postedNotifications addObject:[sender name]];
}

- (BOOL)didObserve:(CPString)aNotificationName
{
    return [postedNotifications containsObject:aNotificationName];
}

@end
```

This class can be configured to register for certain notifications via `-startObserving` and when they are posted, it stores them in an array (postedNotifications). You can then ask it at any time if a notification has been observed using the `-didObserve` method and it will respond with `YES` or `NO`.

So, to use this in your tests, do something like this:

```objj
// This is MyTest.j
@import "TestHelper.j"

@implementation MyTest : OJTestCase

- (void)setUp
{
    observer = [[Observer alloc] init];
}

- (void)testMyMethodDidPostNotification
{
    [observer startObserving:@"MyMethodDidFinishExecution"];
    // do stuff that you would expect to get the notification posted
    [self assertTrue:[observer didObserve:@"MyMethodDidFinishExecution"];
}

@end
```

You could get more fancy with this (like allowing object observing and not just name observing), but the concept doesn't change. Hope this helps anybody thinking about how to test their Capp apps!

[1]:http://cappuccino.org
