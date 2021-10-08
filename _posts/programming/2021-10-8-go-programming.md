---
title: Go Programing Quick Start
published: true
categories: ["go", "programming"]
tags: ["go", "programming"]
layout: blog
thumbnail: "/assets/blog/go-programming/thumb.png"
image: "/assets/blog/go-programming/promo.png"
description: Go Programming
---
## Hello world in go
Every executable go program start with a main package. the package is declare as follow

```go
package main
```

then followd by the import pakage and main function. here is a sample go program 

```go
package main 

import "fmt"

func main() {
    fmt.Println("Hello world")
}
```

<br/>
<br/>

## Declation and Primitives
in go we declare variable with `var` keyword followed by variable name and then the type.
```go
var number int = 10
var name string = "kousher"
```

there are also a sortcut to do that and that is 
```go
    name := 10
```

if we declare a variable and don't use then the compailer will throw a compilation error. 

<br/>

### Build in data types
<div class="table-responsive">
    <table class="table table-sm mb-4">
        <tr>
            <td>string</td>
            <td>int</td>
            <td>int8</td>
            <td>int16</td>
            <td>int32</td>
            <td>int64</td>
        </tr>
        <tr>
            <td>byte</td>
            <td>uint</td>
            <td>uint8</td>
            <td>uint16</td>
            <td>uint32</td>
            <td>uint64</td>
        </tr>
        <tr>
            <td>bool</td>
            <td></td>
            <td>rune</td>
            <td>uintptr</td>
            <td>float32</td>
            <td>float64</td>
        </tr>
        <tr>
            <td>complex64</td>
            <td>complex128</td>
            <td>error</td>
            <td>nil</td>
            <td></td>
            <td></td>
        </tr>
    </table>
</div>

<br/>
<br/>

## Constant 
In go constant are like any other programming language, in go we declare constant using `const` keyword. But there are two condition in go constant 
1. they need to initialize when they declared
2. they need to be available in compile time. no run time constant allowd in go. 

```go
    const name string = "kousher"
    fmt.Println(name)
```

go support package level constant and constant block. A block in go lang define within `(<here>)`.
```go
    const (
        first = 1
        secound = 2
        name string = "kousher"
    )

    func main() { 
        fmt.Println(first)
        fmt.Println(secound)
        fmt.Println(name)
    }
```


### iota and Constant expression
iota is used in constant and everytime it is used it increase it value. 
```go
    const (
        first = iota
        secound = iota + 2 // constant expression
        name string = "kousher"
    )

    func main() { 
        fmt.Println(first)
        fmt.Println(secound)
        fmt.Println(name)
    }
```

<br/>
<br/>

## Pointer 
In go we can get the memory address of an variable or object via pointer, go does support working with pointer but pointer arithmetic not allowed in go.

```go
    var name *string = new(string)
    // pointer address 
    fmt.Println(&name)
    // pointer value
    fmt.Println(*name)
```




## Array and slices
Fixed sized collection of similar data type is array. in go array are bound checked. array are the value type in array.
```go
    var arr [4] string;
    arr := [3]string{
        "hello", 
        "how", 
        "are you"
    }
```
slice are pointed to array, slice does to have any specific type. we does not provide any size for slice.

```go
    slice := [3]int

    slice = append(slice, 1)

    fmt.Println(slice)
```


<br/>
<br/>


## Map 
Maps are key value type. 
```go
    data := map[string]int {
        "name": 1,
        "roll": 2,
    }

    delete(data, roll)

    fmt.Println(data)
```

<br/>
<br/>



## Struct 
much like class in other programming languages. but much more dynamic and robust. fields of the struct are fixed in the compile time.

```go
type Person struct {
    name string 
    age  int8
}

p := Person{
    name: "kousher",
    age: 1,
}
```

<br/>
<br/>

## Importing Package
to import package we need to use fully qualified name support we have follwoing data structure
```go
// <package>
//  - Person.go
// main.go
    import ("fullpakcage-name/<package>")
// when using 
<package>.Person 
```

<br/>
<br/>



## Functions 
```go
    func <name> (num1 int, num2 int) (int, int){
        return num1*2, num2*3
    }
```
we can return error. there are also a `errors` package. 

constructure function start with `newFnName` by convension. 



## OOP in Go
```go
package controllers

import (
	"net/http"
	"regexp"
)

type personController struct {
	personIdPattern *regexp.Regexp
}

func (pc personController) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("hello there"))
}

func newPersonController() *personController {
	// this will not loose from memory
	return &personController{
		personIdPattern: regexp.MustCompile("^/persons/(\\d+)/2"),
	}
}
```

## Interfaces 
```go
    type Person interface{}
```


## Loop 
in go every loop is for loops
```go 
    for i := 0; i < 5; i++ {
		fmt.Println(i)
	}
```

infinite loop
```go 
    for {
		fmt.Println(i)
	}
```

collection types loops
```go
	arr := []int{1, 2, 3}
	for index, value := range arr {
		fmt.Println(index, value)
	}
```

naming variable `_` ignore that value. 


## condtions

```go

    var num1 int 
    var num2 int 

    if num1 == num2 {
        // equal 
    } else if num1 < num2 {
        // num1 less than num 2 
    } else {
        // default 
    }

```


## Panic 
when application can not successfully name. to raise panic, we need to call `panic` function.


