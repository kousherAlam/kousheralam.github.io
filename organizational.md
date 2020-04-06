---
title: Organizational Skills
layout: home
---

<div class="col-12">
<ul class="blog-list organizational-items">
  {% for post in site.posts %}
  {%if post.type == "organizational"  %}
    <li>
      <a href="{{ post.url }}">
        <p class="lead">{{ post.title }}</p>
        <p>{{ post.topics }}</p>
      </a>
    </li>
    {% endif %}
  {% endfor %}
</ul>
</div>