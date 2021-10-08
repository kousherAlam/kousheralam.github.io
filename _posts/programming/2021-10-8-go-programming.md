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
            <td>boolean</td>
            <td></td>
            <td>rune</td>
            <td>uintptr</td>
            <td>float32</td>
            <td>float64</td>
        </tr>
        <tr>
            <td>complex64</td>
            <td>complex128</td>
            <td></td>
            <td></td>
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