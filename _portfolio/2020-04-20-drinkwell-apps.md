---
title: Drinkwell Mobile Apps
date: 2020-04-20 00:00:00 Z
categories:
- mobile-application
tags:
- Flutter
- Node
- Firebase
- Rest Api
layout: portfolio
description: drinkwell provides both single and multi-tap ATM dispensing systems which
  reduce cash leakage at safe water points through RFID-enabled money management and
  metered dispensing. The apps for drinkwell allow them to register new account. check
  account balance, recharge and more.
thubmail: "/assets/portfolio/drinkwell/screenshot.jpg"
image: "/assets/portfolio/drinkwell/screenshot.jpg"
demo_link:
  link: http://drinkwellsystems.com/
  text: More Info
screnshots:
- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- 10
- 11
- 12
- 13
- 14
- 15
- 16
- 17
screnshots_2:
- 1
- 2
- 3
- 4
- 5
preview_ids:
- images
- images-2
---

## Technical Overview 
used dart and flutter to create drinkwell app. it ensure productive development enviroment and high quality apps for business. 


<br/>
## Screenshots [Pump Operator]
<div class="image-viewer">
  <ul id="images" class="unlist my-slider">
  {% for image in page.screnshots %}
    {% capture image_name %}
       /assets/portfolio/drinkwell/{{image}}.png
    {% endcapture %}
    <li>
      <img loading="lazy" src="{{image_name}}" alt="{{image_name}}">
    </li>
    {% endfor %}
  </ul>
</div>
<br/>
<br/>



## Screenshots [Dealer]
<div class="image-viewer">
  <ul id="images-2" class="unlist my-slider">
  {% for image in page.screnshots_2 %}
    {% capture image_name %}
       /assets/portfolio/drinkwell/wasa_dealer/{{image}}.png
    {% endcapture %}
    <li>
      <img loading="lazy" src="{{image_name}}" alt="Picture {{image_name}}">
    </li>
    {% endfor %}
  </ul>
</div>
<br/>
<br/>