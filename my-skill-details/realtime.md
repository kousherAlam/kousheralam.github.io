---
layout: skill
title: Realtime
image: '/assets/blog/css-grid/future_technology_prospects.png'
description: Skill Destails description will be here 
level: 80
posts: 
    - link: /posts/my-post.html 
      text: Test Post 1
    - link: /posts/my-post.html 
      text: Test Post 2
portfolio: 
    - link: /posts/my-post.html 
      text: Portfolio 1
demo: 
    - link: /posts/my-post.html 
      text: Test Demo 1
---

Details body of the 
- title: 'WebSocket'
  link: 'realtime#websocket'
- title: 'MQTT'
  link: 'realtime#mqtt'
- title: 'Web RTC'
  link: 'realtime#webrtc'
- title: 'Apache Kafka'
  link: 'realtime#apache-kafka'
- title: 'Rabbit MQ'
  link: 'realtime#rabbit-mq'


<div class="mt-5">
    {% include skill/post-link.html title="Portfolio" data=page.posts %}
    {% include skill/post-link.html title="Related Posts" data=page.portfolio %}
    {% include skill/post-link.html title="Demo" data=page.demo %}
</div>