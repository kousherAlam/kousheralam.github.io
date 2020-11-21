---
title: Javascript Scope
categories: ["javascript"]
tags: ["javascript", "nodejs"]
layout: blog
image: "/assets/blog/css-grid/future_technology_prospects.png"
description: Javascript Scope is most important concept. scope is define where the javascript scope wil find something. 
---

# Scope 
Scope is the fundamental things in javascript, It allow us to set variable visibility eighter we can access it or not and from where we can access it. 



In javascript world javascript not only just interperte line by line, but when the first time it download the source code it parse the code form top to bottom and have the idea about full code, such as if we declare some variable in the bottom of our code and use it on the top of our code it will move the variable on the top of our code. In javascript it is call `Hoisting`. 


There are two scope in javascript
- Global Scope:  Everything declared in the window object is global in javascript, If we have some javscript file attach to the html when the javascript file is being executed everyting is run on window object. 

- Local scope: when the varaible or the data is not in the window object but in other object we call it a local scope. 


<div class="row">
    <div class="col-12 col-md-6">
    ### javscript global scope
    ```javascript
    const name = 'yourname'; // global scope 
    const getname = () =>{ return window.name; } // 'yourname'
    console.log(getName()) // yourname 
    ```
    </div>
    <div class="col-12 col-md-6">
    ### javscript Local scope
    ```javascript
    (function(){
    const name = 'yourname'; // global scope 
    const getname = () =>{ return window.name; } // 'yourname'
    console.log(getName()) // yourname 
    }())
    console.log(getName()) // ReferenceError: getName is not defined
    ```
    </div>
</div>


## declaration and initialization operation 
in javascript `var x = 10;` is combinatin of two statement one is
1. decalaration 
2. initialization 
how we see it, it doesn't matter in javascript it will show us as two statement. This two statement will not happend in same time, it will happend in totally separed time. even it is variable and function, but in function we can't detach the function vaule. 



## Compilation Phase: Finding Declarations of variable and functions and put them into their appropriate scope 
```javascript
var foo = 'bar';
/**
 * var foo;
 * foo = 'var;
 */

function bar(){
    var foo = 'baz';
}

/**
 * var bar 
 * bar = function (){ var foo = 'baz'; }
 */

function baz(foo){ // name parameter will be treated like regular local variable. 
    // scope of baz 
    foo = "bam";
    bam = "yay";
}

/**
 * var baz 
 * baz = function(){ foo = 'bam'; bam = 'yay'; }
 */


/** Total declaration 5 
 * 
 */
```



## Javascript Just in Time compilateion JIT 


## Left Hand Side -> LHS of Assignment = (equal operator)


## Right Hand Side -> LHS of Assignment = (equal operator)

