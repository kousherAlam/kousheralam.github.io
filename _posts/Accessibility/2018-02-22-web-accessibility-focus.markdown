---
layout: post
title:  "Accessibility: Maintain Focus"
date:   2018-02-22 00:20:00 +0600
categories: post accesibility web
short_description: Focus determain where keyboard on the page. So it is very important for the keyboard only user. It help them to know where they are in the page.
---
## How to navigate ?
In doucument you can use the `TAB` key to focus on a next element. Use twice `F6` to focus on the document, `SHIFT + TAB` To back to upper item. `ARROW KEYS` For navigate inner elment. But not elements are focusable. It's by design cause if user do not need to interact with element then it not necessary to make them focusable.

## How to get keyboard support ?
Navtive HTML give use build in keyboard supports. Native HTML will provide it to all interactable elements. And the tab order will be the dom order in our document.

## Dom order matter
As we know dom order will be focus order of the elements. However if we change the dom order position with css. It will not change the element postion visually but will not change the the focus order. so somethime it can be wiard fellings to user. And that discribe by WebAIM WCAG 2.0 in 1.3.2 section "The reading and navigation order (determined by code order) is logical and intuitive."

## Tab Index
<p class="m-b-0">If we want to build some element those are not native html event like dropdown or modal , Or if we want to change the tab order then we can use tabindex. Tabindex take numeric value, those are:</p>
<ul>
    <li><strong>-1 :</strong> Not Focusable by default. But Programetically focusable by focus() method. </li>
    <li><strong>0 :</strong> It ill be in natural tab order. And Can be focus by focus() method. </li>
    <li><strong> > 0 :</strong> Greater then 0 tab order insert element to menual order. It is cosider as a anti-pattern. </li>
</ul>

## Which elements need to add tabindex
Add tabindex to those element which are user controll element. Ask yourself can user provide input in the element if yes then add tabindex or not. Ex. You do not need to add tabindex to header or image if they are not any kind of controller element in your page. It not ideal to add tabindex in header or non input/actionable element which seems to much more important.


## Managing Focus
If we are working on a single page application. Clicking on the navigation will not take us a different page. It move us down to the page. In this situation we need to give a `tabindex -1` in to the header and when the content load then focus the assosiative header link. But why we do that. Cause if we are in a single page application then the anchored section might be middle of the page. And the user with no vision who can to see the content will not get any idea where they are in the page. They can't know is this a ajax page or the page is scrolled. We can improve this by using `tabindex` and `autofocus` take user where they need to.


## Skip links
In the website our main content is not the first element. there are many things before the main content. Like menu, search, sidebar, handbarger, etc ... That means user need to go throught all of the item before user go to the main content of our page.
But if our user want to just read the content of our page, what then ?? We need to add a Skip link to our page. which my be visible by focus and link to the main content of our page. It will be very useful for keyboard/assistive technology user.
And every temporary keyboard traps element(ex. modal) must be exit their focus on `esc` key.
Skip link HTML
{% highlight html%}
<!--First element on body-->
<a href="#main-content">main-content</a>
<!-- The main content -->
<main id="main-content" tabindex="-1">
    <h1>Webpage main content</h1>
</main>
{% endhighlight %}

Skip link CSS
{% highlight css %}
a['href=#main-content']{
    position: fixed
    left: -50%;
    top: 10px;
    z-index: 999999999;
    padding: 20px;
    background: red;
    color: white;
    transform: translate(-50% , 0 );
}
a['href=#main-content']:focus{
    left: 50%;
}
{% endhighlight %}

## Focus in complex components
If we are design a complex element. We need to add keyboard support to this element. keyboard support should like be native element. It will helpful to user. There are no learning curve or they can use what they know. With ARIA and keyboard event we can add keyboard support to an custom complex element.
### Revoing Technique

## Offset content
Offset content like drawer is a good challenge to accessibility. `document.activeElement` will give us corrently focused element. Prevent it with `display:none;` or `visibility:hidden` in css it will remove the focus form the element. We can use `accessiblity developer tools` On chrome.


## Modals and keyboard traps & Temporary keyboard Traps
<p class="m-b-5">Sometime when you design a custom element it working with keyboard very well but it not focus on the next focusable element. Or it just traps user keyboard inside it. and it's very bad to have in page</p>
<p class="m-b-5">
<strong>2.1.2: No Keyboard Trap</strong>
Keyboard focus is never locked or trapped at once particular page element. The user can navigate to and from all navigable page elements using only a keyboard.
</p>
But sometime when we open modal or some controll like this, we don't want user focus other element but our modal. So then we need to do store privious focus element. and trap keyboard focus on the modal. In this time temporary focus come in handy.

