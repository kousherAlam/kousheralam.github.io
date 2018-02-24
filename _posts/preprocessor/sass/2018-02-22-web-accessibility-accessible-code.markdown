---
layout: post
title:  "SASS: Syntactically Awesome Style Sheets"
date:   2018-02-25 00:10:00 +0600
categories: post sass
short_description: SASS is a preprocessor for css. It allow us to write css in programetic way. Maintain and manage sass is very easy. We can take many advantages of sass. SASS give us a nice enviroment to quickly finish and  maintian our style. Woking with sass is much more enjoyable rather than css. 
---
Sass is an preprocessor of CSS that enables you to use things like variables, nested rules, inline imports and more. It also helps to keep things organised and allows you to create style sheets faster. SASS file use `.sass` or `.scss` file type. In `sass` formart it allow indent for write style and `.scss` allow bracket. You need to write sass and compile it css. 


When people write sass they separate their variable in a file. Then When they need to change something they just change the variable name. And it's much more faster than changing actual css file. Sometime we need to write same kind of css rule again again with some litter differece. To improve this situation we can use sass mixin. Let's take look sass syntax.
<ul>
    <li><a href='#sass_variable'>Variable</a></li>
    <li><a href='#sass_nesting'>Nesting</a></li>
    <li><a href='#sass_import'>Import</a></li>
    <li><a href='#sass_reference_parent'>Reference Parent</a></li>
    <li><a href='#sass_comment'>Comment</a></li>
    <li><a href='#sass_datatype'>Data Type</a></li>
    <li><a href='#sass_at_rules_directive'>@-Rules and Directives</a></li>
    <li><a href='#sass_controll_directive'>@-Controll Directive</a></li>
    <li><a href='#sass_for_loop_directive'>@-for() Directive</a></li>
    <li><a href='#sass_each_loop_directive'>@-each() Directive</a></li>
    <li><a href='#mixin'>Mixin</a></li>
    <li><a href='#sass_include'>Include</a></li>
</ul>

<p id="sass_variable" class='m-b-5'><strong>SASS Variable: </strong> Variable are available to their scope and nested scope. We can use <span class='highlighter-rouge'>!global</span> to add vairable to global scope.</p>
{% highlight sass %}
$main-color: #000
body
    background-color: $main-color

{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
body{
    background-color: #000;
}
{% endhighlight %}


<p class='m-t-40 m-b-5' id='sass_nesting'><strong>SASS Nesting:</strong> To nest css we just need to indent it in sass. And property can indent itself.</p>
{% highlight sass %}
$main-bg-color: #000
$main-text-color: #fff
body
    background-color: $main-bg-color
    p 
        color: $main-text-color
        font: 
            color: black
            style: italic
            size: 1em


{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
body {
    background-color: #000; 
}
body p {
    color: #fff; 
    font-color: black;
    font-style: italic;
    font-size: 1em;
}
{% endhighlight %}



<p class='m-t-40 m-b-5' id='sass_import'><strong>SASS Import:</strong> In sass we can split specific part into specific file. It help us to organize our style. It very helpful for maintaining code. to import file we need to add underscore before the file name. In Sass file we call the file without the underscore and extention.</p>
{% highlight sass %}
// _var.sass file 
$main-bg-color: #000
$main-text-color: #fff

// main.sass file
@import "var"
body
    background-color: $main-bg-color
    p 
        color: $main-text-color


{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
body {
    background-color: #000; 
}
body p {
    color: #fff; 
}
{% endhighlight %}




<p class='m-t-40 m-b-5' id='sass_reference_parent'><strong>SASS Reference Parent:</strong> We can easily referace parent with <span class='highlighter-rouge'>&</span> chareter. <span class='highlighter-rouge'>&</span> Will replace the parent selector. <span class='highlighter-rouge'>&</span> must be first charecter but it can add suffix.</p>
{% highlight sass %}
$primary-color: green
$default-color: silver
a
  font-weight: bold
  text-decoration: none
  &:hover
    text-decoration: underline
  body.firefox &
    font-weight: normal
.btn
    font-size: .9em 
    cursor: pointer
    border-width: 0px
    border-radius: 3px
    &-primary
        background-color: $primary-color
    &-default
        background-color: $default-color

{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
a {
  font-weight: bold;
  text-decoration: none; 
}
a:hover {
    text-decoration: underline; 
}
body.firefox a {
    font-weight: normal; 
}

.btn {
  font-size: 0.9em;
  cursor: pointer;
  border-width: 0px;
  border-radius: 3px; 
}
.btn-primary {
    background-color: green; 
}
.btn-default {
    background-color: silver; 
}
{% endhighlight %}


<p class='m-t-40 m-b-5' id='sass_comment'><strong>SASS Comment:</strong> We can use single and multiline comment in sass.</p>
{% highlight sass %}
    // single line comment 
    //
        multiline comment 
        Here something 
    //
{% endhighlight %}

<p class='m-t-40 m-b-5' id='sass_datatype'><strong>SASS Datatype:</strong> SassScript support eight data type.</p>
<ul>
    <li>Numbers: <span class='highlighter-rouge'>(ex: 1,2,20px)</span></li>
    <li>String of text with or without quote: <span class='highlighter-rouge'>(ex: "red", "blue", "green")</span></li>
    <li>Colors: <span class='highlighter-rouge'>(ex: blue, #fff, #000, rgba(10,255, 10, .4))</span></li>
    <li>Booleans: <span class='highlighter-rouge'>(ex: true, false)</span></li>
    <li>nulls: <span class='highlighter-rouge'>(ex: null)</span></li>
    <li>Lists of values separated by spaces or commas: <span class='highlighter-rouge'>(ex: 1.5em, 1em 0 2em, Helvetica, Arial)</span></li>
    <li>maps from one value to another: <span class='highlighter-rouge'>(ex: key1: value1, key2:value2)</span></li>
    <li>function refereace</li>
</ul>
<p class='m-b-5'><strong>Strings: </strong> We can use string with or without quote. For Interpolation we can use <span class='highlighter-rouge'>#{ }</span></p>
{% highlight sass %}
    =firefox-message($selector)
        body.firefox #{$selector}:before
            content: "Hi, Firefox users!"
    +firefox-message(".header")
{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
body.firefox .header:before {
  content: "Hi, Firefox users!"; 
}
{% endhighlight %}

<p class='m-b-5'><strong>Lists: </strong>On their own, lists don't do much, but the SassScript list functions make them useful. The nth function can access items in a list, the join function can join multiple lists together, and the append function can add items to lists. The @each directive can also add styles for each item in a list. We can use (+) to concat string. </p>

<p class='m-b-5'><strong>Maps: </strong>Maps represent an association between keys and values, where keys are used to look up values. They make it easy to collect values into named groups and access those groups dynamically. They have no direct parallel in CSS, although they're syntactically similar to media query expressions. Unlike lists, maps must always be surrounded by parentheses and must always be comma-separated.</p>

<p class='m-b-5'><strong>Operations: </strong>Relational operators (<, >, <=, >=, + , - , * , / ) are also supported for numbers, and equality operators (==, !=) are supported for all types.</p>


<p class='m-b-5' id='sass_at_rules_directive'><strong>@-Rules and Directives:</strong> Sass supports all CSS3 @-rules, as well as some additional Sass-specific ones known as "directives." These have various effects in Sass.</p>
<ul>
    <li><strong>@import: </strong> Can import partial support nested import and within selector imports.</li>
    <li><strong>@media: </strong> Media query & can be used as nested in selector.</li>
    <li><strong>@extend: </strong> We can inheritance other class. can also inheritance puesdo selector.</li>
    <li><strong>@at-root: </strong> The @at-root directive causes one or more rules to be emitted at the root of the document, rather than being nested beneath their parent selectors. It can either be used with a single inline selector.</li>
    <li><strong>@debug, @warn, @error : </strong> Directive prints the value of a SassScript expression to the standard error output stream</li>
</ul>


<p class='m-t-40 m-b-5' id='sass_controll_directive'><strong>Controll Directives:</strong> The built-in if() function allows you to branch on a condition and returns only one of two possible outcomes. The @if statement can be followed by several @else if statements and one @else statement. If the @if statement fails, the @else if statements are tried in order until one succeeds or the @else is reached. For example:</p>
{% highlight sass %}
$type: monster
p
  @if $type == ocean
    color: blue
  @else if $type == matador
    color: red
  @else if $type == monster
    color: green
  @else
    color: black
{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
p {
  color: green; 
}
{% endhighlight %}

<p class='m-t-40 m-b-5' id='sass_for_loop_directive'><strong>Loop Directives:</strong> The @for directive repeatedly outputs a set of styles. For each repetition, a counter variable is used to adjust the output. The directive has two forms: @for $var from &lt;start&gt; through &lt;end&gt; and @for $var from &lt;start&gt; to &lt;end&gt;. </p>
{% highlight sass %}
@for $i from 1 through 3
  .item-#{$i}
    width: 2em * $i
{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
.item-1 {
  width: 2em; 
}
.item-2 {
  width: 4em; 
}
.item-3 {
  width: 6em; 
}
{% endhighlight %}

<p class='m-t-40 m-b-5' id='sass_each_loop_directive'><strong>@each Directives:</strong> The @each directive usually has the form @each $var in &lt;list or map&gt;. $var can be any variable name, like $length or $name, and &lt;list or map&gt; is a SassScript expression that returns a list or a map.</p>
{% highlight sass %}
@each $animal in puma, sea-slug, egret, salamander
  .#{$animal}-icon
    background-image: url('/images/#{$animal}.png')
{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
.puma-icon {
  background-image: url("/images/puma.png"); 
}
.sea-slug-icon {
  background-image: url("/images/sea-slug.png"); 
}
.egret-icon {
  background-image: url("/images/egret.png"); 
}
.salamander-icon {
  background-image: url("/images/salamander.png"); 
}
{% endhighlight %}


<p class='m-t-40 m-b-5' id='mixin'><strong>Mixin</strong> It like function & can accept arguments.</p>
{% highlight sass %}
=border($width:3px)
    border: #{width} solid black 
button
    +border(4px)
{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
button{
    border: 4px solid black
}
{% endhighlight %}

<p class='m-t-40 m-b-5' id='sass_include'><strong>@include</strong> Copy form other selector style.</p>
{% highlight sass %}
@mixin apply-to-ie6-only
  * html
    @content
@include apply-to-ie6-only
  #logo
    background-image: url(/logo.gif)
{% endhighlight %}
<p class='m-b-5'>It Will Compile Into</p>
{% highlight css %}
* html #logo {
  background-image: url(/logo.gif);
}
{% endhighlight %}

<p class="m-t-10 m-b-10">It have lot of advantage. SASS can make your developer life more easier.</p>