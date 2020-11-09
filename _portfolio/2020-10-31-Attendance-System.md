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
v1_images: [
  "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png",
  "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", 
  "15.png", "16.png", "17.png"
]

v2_images: [
  "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", 
  "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png"
]

preview_ids: ["images", "imagesv1"]
---

## Technology Overview 
It use mqtt to communicate between ai and node backend. and use websocket between admin panel and the server. It provide realtime user attendance and the full monthly and yearly report

<br/>

## Preview of V1 
{% 
  include media/image-viewer.html 
  basehref="/assets/portfolio/attendance/v1/" 
  screnshots= page.v1_images
  id="images" 
%}




## Preview of V2

{% 
  include media/image-viewer.html 
  basehref="/assets/portfolio/attendance/v2/" 
  screnshots= page.v2_images
  id="imagesv1" 
%}
