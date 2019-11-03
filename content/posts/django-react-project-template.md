---

type: "post"
title: "React Django CookieCutter - Fullstack Web Application Template"
category: "announcement"
date: "2019-11-02"
slug: "/blog/template-for-react-django-fullstack-web-applications"
metaDescription: |
    Start a Django + React project faster than ever with this CookieCutter Template!

---

I suffer from a problem that's familiar to a lot of developers, which we can call "Side Project Restarting Syndrome". There's a lot of neat code sitting on my laptop, neglected, unused, because it's stuck needing more boilerplate, a project to be put into, or a better `Makefile`.

Rather than let all of my ideas languish in my `spikes/` and `sketches/` folders until my SSD gives out from running `npm install`, I set out to create a new, easy-to-use, and opinionated boilerplate that starts my projects just how I like them.

## React Django Goodstuff

Created with hackathons, weekend projects, and micro-SaaS apps in mind, [React Django Goodstuff](https://github.com/madelyneriksen/react-django-goodstuff) (RDG) is an opinionated boilerplate to create new projects using, well, React and Django.

It's got some other things going for it:

* Docker Based Development.
* Redis & Postgres Support
* Social logins with Django AllAuth
* Support for Github Actions, pretty much the spiritual successor to Travis CI.

...and a horde of other features.

## What about other templates?

All the other templates for Django I have seen are either _too_ opinionated (like including Gulp and Boostrap for SSR) or not opinionated  _enough_ (like the vanilla Django template). This template is the right format for _me_ as a developer, and optimized for creating cool stuff fast.

There are [literally a ton](https://github.com/topics/cookiecutter-template) of other CookieCutter templates on Github under the topic `cookiecutter-template`, however. If RDG isn't right for you, you can find (or make) a template you like instead!

## Where To Get It

You can check out the source code [over on Github](https://github.com/madelyneriksen/react-django-goodstuff). Alternatively, if you already have CookieCutter installed and you're eager to try it out, you can install it like this:

```bash
cookiecutter gh:madelyneriksen/react-django-goodstuff
```

Note that you will also need Make ([here is a tutorial for beginners](/blog/gnu-make-for-beginners)) and Docker to use the project!
