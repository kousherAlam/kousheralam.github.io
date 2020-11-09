---
title: Attendance System
date: 2020-10-31 00:00:00 Z
categories:
- web-application
tags:
- Node
- MySQL
- Rest Api
- Angular
- MQTT
- Websocket
layout: portfolio
description: Attendance System is a ai driven project. In it's backend it run ai to
  detect user faces. and in the backend it generate user attendance report.
thubmail: "/assets/portfolio/attendance/screenshot.jpg"
image: "/assets/portfolio/attendance/screenshot.jpg"
v1_images:
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
v2_images:
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
preview_ids:
- images
- imagesv1
---

## Technology Overview 
It use mqtt to communicate between ai and node backend. and use websocket between admin panel and the server. It provide realtime user attendance and the full monthly and yearly report

<br/>

## Preview of V1 

<div class="image-viewer">
  <ul id="images" class="unlist">
  {% for image in page.v1_images %}
    {% capture image_name %}
      /assets/portfolio/attendance/v1/{{image}}.png
    {% endcapture %}
    <li>
      <img loading="lazy" src="{{image_name}}" alt="Preview Of V1 Image No {{image}}" />
    </li>
    {% endfor %}
  </ul>
</div>


## Preview of V2

<div class="image-viewer">
  <ul id="imagesv1" class="unlist">
  {% for image in page.v1_images %}
    {% capture image_name %}
      /assets/portfolio/attendance/v2/{{image}}.png
    {% endcapture %}
    <li>
      <img loading="lazy" src="{{image_name}}" alt="Preview Of V2 Image No {{image}}"/>
    </li>
    {% endfor %}
  </ul>
</div>