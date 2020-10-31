---
layout: portfolio
title: National Maize Corporation
categories: 
    - Web Application

tags: 
  - PHP
  - Wordpress  
  - Theme Development

description: National Maize Corporation (NMC) is a fully state owned enterprise that has an annual turnover of approximately one hundred and twenty million emalangeni ( E120M ). The Corporation was established in 1985 in accordance with the Companies Act of 1912.

thubmail: '/assets/portfolio/nmc/screenshot.jpg'
image: '/assets/portfolio/nmc/screenshot.jpg'

demo_link: 
  link: http://nmc.co.sz
  text: Live Preview

screnshots: [1,2,3,4]
preview_ids: ["images"]
---

## Technology Overview 
The website is build using wordpess, and created custom theme for the website to make sure good performance and easy to use functionality. 

<br/>
## Screenshots 
<div class="image-viewer">
  <ul id="images" class="unlist">
  {% for image in page.screnshots %}
    {% capture image_name %}
       /assets/portfolio/nmc/{{image}}.png
    {% endcapture %}
    <li><img loading="lazy" src="{{image_name}}" alt="Picture {{image_name}}"></li>
    {% endfor %}
  </ul>
</div>

