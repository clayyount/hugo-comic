---
title: 'Goodbye Squarespace, Hello Hugo'
date: 2018-11-18T03:07:23.187Z
image: /img/hugo-logo.png
tags:
  - website
  - Hugo
  - Netlify
  - GitHub
  - Squarespace
---
## A Little History

I originally developed my [Squarespace webcomic template](/blog/2015/08/12/the-best-style-is-no-template-style/) because I wasn't happy with having to use Wordpress+ComicPress and I wanted another option. I latched on to Squarespace because it had a pretty robust developer platform and allowed for more customization than any other online website builder. Also, when I started, Squarespace was $8 a month, and cheaper than most hosting solutions, so it seemed like a great deal. Since then, Squarespace has let their developer platform languish, and their plan that supports developer templates jumped up to $26 a month. The final straw was after I'd spent hours and hours working with their platform, I discovered a bug that fundamentally broke my comic archive template. I contacted Squarespace multiple times, and they've refused to address it. In short, I wanted out.

Fast forward a couple years, and I still hadn't found a better solution that ticked all the boxes. I looked into [Ghost CMS](https://ghost.org), but it lacked a lot of features, and it runs on Node JS, which makes hosting pricey. [Grawlix](http://www.getgrawlix.com/blog) looked promising too, but I've had security issues in the past with LAMP stacks, and I didn't want to implement a not very well documented solution that may not get timely security fixes. Turns out, the creators stopped supporting it.

## Enter Static Site Generators

So after I'd done a good amount of research into alternatives, my friend tells me good things about something called _static site generators_. The idea of foregoing server side code entirely and generating your entire site as flat HTML files everytime you publish sounded crazy, but the upsides are incredibly compelling: 

* Your site is wicked fast. No server side code and no databases means you are just serving up static files.
* You can host your site anywhere and do it for pennies or even free.
* It's incredibly secure because there's no server side code to exploit or database to hack.
* If you use Github in your publish process, your site is automatically backed up and versioned.

The first static site generator I tried was [Jekyll](https://jekyllrb.com). It was the oldest one with the most support, but sites with a lot of entries take a long time to build, so that was a no-go for webcomics, which can have thousands of entries. Then I tried [Hugo](https://gohugo.io), which uses [Go templates](https://golang.org/pkg/html/template/), so it is fast enough to handle comics with thousands of entries without a problem. I started working on a comic template for my site, but there were a few things holding me back:

* Static site generators need to use the command line interface (CLI), which requires linux, windows, or mac. No iPad. 
* There's no Content Management System (CMS), and no updating via the web.
* No server side code meant no user-generated input. So no comments, no contact forms, and no store.

Now, I'm ok with using the CLI and editing markdown files without a CMS, but I was looking for a solution I could recommend to anybody, and it felt like a solution for developers by developers. Also, I'd moved over to drawing on an iPad, and I wanted to not have to lug my laptop around if I wanted to update my site.

## Enter Netlify

[Netlify](https://www.netlify.com) offers a couple of things that were game changers for me, and made me take the plunge into rebuilding my website on a their platform.

* It's free hosting tier is good enough to run my entire website.
* It has a built in web-based CMS for Hugo so I can publish from my iPad
* It hooks into Github for publishing, so I get a free backup/version control
* It even offers basic contact forms for free

So, I've rebuilt my website using [Hugo](https://gohugo.io), [Github](https://github.com), and [Netlify](https://www.netlify.com), and I couldn't be happier with the results. I've copied over all the features and content from my old site except comments. I decided to leave those out because I don't think it added much, and I didn't want to have to manage the spam. If I really want to add them back in, I can use something like [Discus](https://disqus.com) or [Intense Debate](https://www.intensedebate.com). Hugo+Github+Netlify isn't as accesible for people with no coding experience as Squarespace is, but it's perfect for me, and if you are willing to put in the effort, it could be perfect for you too. I'll be working on a generic comic website template and instructions in the future, but for now, if any adventurous artists want to take a look at my website's code and go it alone, it's all up on Github for [anyone to clone](https://github.com/clayyount/hugo-comic).

## Moving Forward

I know my Squarespace templates have gotten a good amount of interest from comic creators who wanted to use Squarespace, but I don't really have the time or energy to maintain it by following everything they change or break. Also, they burned me pretty bad with the unfixable bug, so I've pretty much lost interest in developing on their platform. I know Hugo and Github can seem daunting to the uninitiated, and hopefully services like Netlify will continue to make it even easier for artists to set up their sites without having to deal with too much code or command line.
