---
layout: post
title:  "PUG : HTML Preprocessor"
date:   2018-02-17 02:19:18 +0600
categories: post preprocessor pug
short_description: Pug is a high-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.
---
Pug is a high-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers. Priviously Pug was formaly known as "jade".

### Why is it useful ?? 
  When you design web page with html it very hard to maintain so boaring to write html tag over and over. To improve this situation you can take benifite form pug. You can use pug templating feature to improve your efficieny and make web page design much easier. Or if you write nodejs as your backend/server code you can use pug as a templating engine as well.


### Installation 
__Package:__ `npm install pug`

__Command Line:__ `npm install pug-cli -g`

__Run With:__ `pug --help`
### Basic Uses
Just use them tag name , it will generate the angle bracket tag example `html` will generate `<html></html>`.to use attribute use paranthesis `h1(class='my-class')`. You can use some well known shortcode for pug `h1.my-class` it will generate `<h1 class='my-class'></h1>`. See the example :-

  {% highlight html %}
    h1.title The title <!-- <h1 class='title'>The Title</h1> -->
    h1#main-title <!-- <h1 id="main-title"></h1> -->
    a(href='#') Link <!-- <a href='#'>Link</a> -->
  {% endhighlight %}

### Basic Page 
  {% highlight pug %}
    doctype 
    html(lang='en-US')
      head
        title Hello world
      body 
  {% endhighlight %}

### PUG Comments
  {% highlight pug %}
    // just comment , it will appear in html page
    //- It will not appear in html
    //-
      Comments for your template writers.
      Use as much text as you want.
    //
  {% endhighlight %}

### Variable 
  {% highlight pug %}
    - var name = Kousher alam
    h1 #{name}
  {% endhighlight %}

### Escape Variable 
  {% highlight pug %}
    - var name = <em>Kousher alam</em>
    h1 \#{name} <!--<h1>#{name}</h1> -->
    h1 !{name} <!--<h1><em>Kousher alam</em></h1>-->
  {% endhighlight %}

### Attributes 
  {% highlight pug %}
    a(href='#link' (click)='openModal()') Open Modal <!-- It will be an error -->
    a(href='#link' '(click)'='openModal()') Open Modal 
    <!-- <a href='#' (click)='openModal()'>Open Modal</a> -->
  {% endhighlight %}

### Long Line  
  {% highlight pug %}
    p. 
      This is a very long and boring paragraph that spans multiple lines.
      Suddenly there is a #[strong strongly worded phrase] that cannot be
      #[em ignored]
  {% endhighlight %}

### Mixin
  {% highlight pug %}
    mixin link(title, link)
      a(href=link) #{title}
    
    +link('click here','/about.html')
  {% endhighlight %}

### Multiline  
  {% highlight pug %}
    p hi there how are you ?
    | I'm fine and you ?
    <!--<p>hi there how are you ? i'm fine and you ?</p>-->
  {% endhighlight %}

### If condition
  {% highlight pug %}
    mixin footer(title, position)
      if position === 'card'
        footer.card-footer
          h2 title
          if block 
            .des block
      else if position === 'sidebar'
        footer.site-footer
          if block 
            .des block
          p.ending-line #{title}
      else
        footer.site-footer
          if block 
            .des block
  {% endhighlight %}

### When Condition 
  {% highlight pug %}
    mixin membershipStatus(piont, text)
      when point -1
        - break 
      when point 0
        span.basic #{text}
      when point 1
        span.pro-basic #{text}
      when point 2
        span.pro-gold #{text}
      default 
        span.basic #{text} 
  {% endhighlight %}

### Block Expansion  
  {% highlight pug %}
    mixin membershipStatus(piont, text)
      when point -1
        - break 
      when point 0: span.basic #{text}
      when point 1: span.pro-basic #{text}
      when point 2: span.pro-gold #{text}
      default : span.basic #{text} 
  {% endhighlight %}

### Conditionals  
  {% highlight pug %}
    - var user = {des: 'foo bar baz'}
    #user 
      if user.des 
        h2.green #{user.des}
      else 
        h2.no-des No Description provided
  {% endhighlight %}

### Loops
  {% highlight pug %}
    - for (var x = 0; x < 3; x++)
      li item
    - var list = ["Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis"]
    each item in list
      li= item
  {% endhighlight %}

### Includes and Extends
If we include with `include file.pug` then it will include the html in out page, otherwise if it is anthoer format except `.pug` then it will include the raw text. Or we can use extends and then modify it's block or `append/prepend`
  {% highlight html %}
    <!--layout.pug-->
    html
      head
        title My Site - #{title}
        block scripts
          script(src='/jquery.js')
      body
        block content
        block foot
          #footer
            p some footer content
    <!--Modify block content with extned-->
      extends layout.pug
      block scripts
        script(src='/jquery.js')
        script(src='/pets.js')
    <!--Append some content-->
    extends layout.pug
    block append head
      script(src='/vendor/three.js')
      script(src='/game.js')
  {% endhighlight %}