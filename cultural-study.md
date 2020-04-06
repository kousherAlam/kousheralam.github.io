---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
title: Books And Story
layout: home
---
<div class="col-12">
<ul class="blog-list cultural-items">
  {% for post in site.posts %}
  {%if post.type == "cultural_study"  %}
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


