---
title: Nybsys Website
date: 2020-04-20 00:00:00 Z
categories:
- website
tags:
- javascript
- php
- wrodpress
layout: portfolio
description: The website of nybsys, it is the redesign of it's privious version, with
  some extra new feature such as events and career section.
demo_link:
  link: http://nybsys.com
  text: Live Preview
thubmail: "/assets/portfolio/nybsys/screenshot.png"
image: "/assets/portfolio/nybsys/screenshot.png"
screnshots:
- 1
- 2
- 3
- 4
- 5
- 6
preview_ids:
- images
---

## Overview 
Build this site using wordpress. Create custom theme for the website and all functionality is supported form the theme, no extra plugin is created. 

It use custom post type and meta box for some of it's feature. 

<br />

## Screenshots 

<div class="image-viewer">
  <ul id="images" class="unlist my-slider">
  {% for image in page.screnshots %}
    {% capture image_name %}
       /assets/portfolio/nybsys/{{image}}.png
    {% endcapture %}
    <li>
      <img loading="lazy" src="{{image_name}}" alt="Picture {{image_name}}">
    </li>
    {% endfor %}
  </ul>
</div>

