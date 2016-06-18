---
title: Campusnews
project: campusnews
---

Campusnews is a service app, where you can choose your university and receive many information about your location. E.g. when the next buses are departing, what the cafeteria is offering this week or if your seminar is cancelled.

This project was part of my research internship at the [University of Koblenz](http://www.uni-koblenz-landau.de/). This was my very first objective-c project and I was really looking forward to it. We were a small team of 4 students where 3 of us had to push the former app from version 2.x to 4.0 on iOS and the remaining student build an initial Android port.

I was responsible of organising the development of the iOS version. While Niklas and Alex did an amazing job developing 2 new features (map overview with gps tracking and an in app email client) I had to prepare the structure for all coming changes. Sadly but true I kicked nearly 90% of the existing code and wrote a new version from the ground up. This was caused by former design decisions which didn't allow any scaling or changes on the default behavior. The two main problems were that the tap menu paradigm didn't work out well with the new multi location support and the entire network structure. We wanted to switch from http to https. To make this happen I needed to replace the old fake async (which were actually sync requests in a background thread) with real async requests. There were so many changes that I dropped the network part and wrote a clean new setup.

The research internship was finished with an awesome and stable app which you can checkout in these stores:

[![Campusnews Appstore Link](/assets/app_store_135x40.png)](https://itunes.apple.com/de/app/campusnews/id320979722) [![Campusnews Playstore Link](/assets/play_store_129x45.png)](https://play.google.com/store/apps/details?id=com.campusnews.uni)

Just to give you an overview of most of my tasks:

* design and implementation of a new code base
* switch from tab to swipe menu
* redesign network structure
* redesign core data
* update mensa, bus, course, newsfeed plugins
* add retina support
* add multi location (switching) functionality
* add search and social media functionality
* logo, screen and menu design
* general refactoring
