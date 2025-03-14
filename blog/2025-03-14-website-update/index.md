---
slug: website-update
title: "New website backend"
tags: [software, community]
authors: wizzo
---

There has been an update to the backend used for the Zaparoo.org website. You'll notice the design has changed a little, but the content should be (basically) the same as before. In cases where addresses have changed, I've put redirects in place to keep old links valid. If you notice any broken links, please report them so I can fix them!

<!--truncate-->

The old website was built with [Hugo](https://gohugo.io/) and the new one is built with [Docusaurus](https://docusaurus.io/). I chose Hugo originally because I was somewhat familiar with it already and I needed to whip something up quickly. It did the job, but it's very geared towards blogs and microsites, and it was difficult to customise without maintaining a lot of extra code (the old front page hero section looks how it does because I don't know how to change it). Docusaurus is much easier to extend and customise, especially with its ability to embed React components.

The other reason for this change will be a longer term project to migrate the [Zaparoo Wiki](https://wiki.zaparoo.org/) to this site. Now this new site is up, that will just happen slowly in the background until it's finally time to flick the switch. I've got quite a few reasons now for wanting to do this:

- **Using a wiki was originally an experiment to see if I could get the community to contribute more easily.** A handful of people did, which I'm very grateful for, but as these things usually go it ended up being mostly me adding anything and maintaining it. I still believe a wiki can succeed, but it needs a strong community behind it specifically. For Zaparoo, the wiki is important but not critical.
- **MediaWiki is not great (for what I wanted) and it's kind of the best of a bad bunch.** Wiki software in general has really stagnated. There's a couple of modern ones but they're still really immature. These days as well, running a traditional web server plus database app is kind of awkward and it's relatively expensive for what it is.
- **Does a wiki even make sense anymore to lower the barrier to edit? I don't know.** It's not actually any more or less difficult to sign up for a wiki account and learn to edit wiki markup than it is to sign up for a GitHub account and learn to use Markdown. Learning Markdown is arguably much more useful in the long run for someone too.
- **Wiki backups are complex and expensive.** The Zaparoo Wiki is backed up, you can't have the backups, because they have private data in them. If I get hit by a bus, the backups are gone. Moving to a static site means everything is automatically open and backed up.
- **MediaWiki is complex to extend and requires committing to maintenance if you do.** I'm not interested in committing to learning to write plugins, and many existing plugins are unmaintained while MediaWiki itself is still active and introduces breaking changes. When I wrote the article about QR codes, I wanted to add a widget to generate them on the page. I couldn't do that. When I made the page of 3D printed cases, I wanted people to add their own designs. That's annoying to do when it's just unstructured text (like it is now) and it's super complex to find just the right plugin combination to support it.
- **I think the wiki format devalues some types of content.** I'm not sure this is as tangible as my other points, but something doesn't quite _feel_ right about API documentation that technically anyone can edit. A list of vendors doesn't quite _feel_ totally trustworthy to me when anyone can edit the page.
- **Spammers are annoying.** Doesn't happen that often, but it happens, and it bugs me every time I need to log in and revert a page. Moving to a static site completely eliminates this problem.
- **Contributors have poor visibility.** If you edit the wiki, you won't get the same level of recognition as if you contribute to any of the other projects. That sucks to me, because I consider documentation to be as important as any other work.

Anyway, those are some of my lessons learned from this experience. In a nutshell, the wiki already basically functions as a static site, so why not just make it one? Even though I have many complaints with it, the current site has served its purpose well and it's not like it's a constant thorn in my side or anything.

You probably won't hear anything else about this for a long while because I'll just be editing pages in my spare time, but that's the plan. Please feel free to help migrate content from the wiki if you're interested as well.
