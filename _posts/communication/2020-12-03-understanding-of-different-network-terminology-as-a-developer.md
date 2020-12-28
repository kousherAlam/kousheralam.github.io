---
title: Basic Understanding of different Network Terminology as a Developer
published: true
categories: ["Network", "communication"]
tags: ["Network", "HTTP", "TCP"]
layout: blog
thumbnail: "/assets/blog/communication/network-thumb.jpg"
image: "/assets/blog/communication/network.jpg"
description: Basic Understanding of different Network Terminology as a Developer
---

## OSI Model 
<div class="row">
  <div class="col-12 col-md-7">
    <p>OSI Stand For `Open System Interconnection`, it is a standard to communication two computer accross the network. It defines some standard layer from how bit will be transfer to the application. </p>
    <h3>The Problem OSI Model Solve</h3>
    <p>Suppose we want to transfer data between two computer across the internet, the installted hardware and software may be different in this two computer. So encoding and decoding of bits from receiving to showing it to user can be different. This can cause huge problem. To resolve the problem OSI Model is born. </p> 
    <a class="btn btn-link text-success" href="/blog/network/communication/2020/12/28/osi-model.html">Read More About OSI Model</a>
  </div>
  <div class="col-12 col-md-5">
    <img class="img img-thumbnail" style="width:100%" src="/assets/blog/communication/osi/layers.png"/>
  </div>
</div>




--- 

## IP Address
---
## Mac Address
12 Digit Alpha Numerical Number Added in `Network Interface Card` of a Computer by The computer menufacturer. 
---
## Port 
One computer to communicate with other computer with endpoint / ip address. But if in a computer there are multiple software is running on a single computer such as web server, email server or etc. to specifically point the software in a endpoint/host compoter we use port. 

Port is a logical construct, it indentify a process of an system.

There are 1024 port, which are defined for commonly known program. 

Logical construct that identify an process of an system. A port is identified for each transport protocol and address combination by a 16-bit unsigned number, known as the port number. A port number is always associated with an IP address of a host and the type of transport protocol used for communication. It completes the destination or origination network address of a message. Specific port numbers are reserved to identify specific services so that an arriving packet can be easily forwarded to a running application.
[https://en.wikipedia.org/wiki/Port_(computer_networking)]
---




## Sockets
A network socket is a software structure within a network node of a computer network that serves as an endpoint for sending and receiving data across the network. The structure and properties of a socket are defined by an application programming interface (API) for the networking architecture. Sockets are created only during the lifetime of a process of an application running in the node.
[https://en.wikipedia.org/wiki/Network_socket]
---



## IPC (Inter Process Communication) 
It's the communication protocol between two processes. they used shared memory and also messaage passing system when try to communication. 
---




## RPC (Remote Procedure Calls)
RPC is a protocol that allow us to communicate with different program located on different network, without knowing the network details. 

In RPC it use message based communication scheme, and messages are structured. 

RPC listend to a port on a remote system
---


## NAT (Network Address Translation)
It's a process to mapping a ip address to another ip address. 
-----


## TCP 
-------


## UDP
----

## ARP (Adress Resolution Protocol)
---

## Web Server
---

## HTTP
-------


## HTTP2
-------
