---
title: Protocol buffer
published: false
categories: ["Network", "communication"]
tags: ["Network", "HTTP", "TCP"]
layout: blog
thumbnail: "/assets/blog/communication/protocol-buffers-thumb.png"
image: "/assets/blog/communication/protocol-buffers.png"
description: Protocol buffer
---
## Protocol Buffer:
-------------------
Initially Release in 2008 by google. It use binary format instate of text based format so  very compress and small in message size thus increasing in speed. 

Protocol buffer is platform and language neutral and support version massages, so we can improve our existing api without hurting other application which are using old api. 



Protocol buffer separate context of the message from the data of the message. 
```javascript
{
	firstname: "kousher",
	lastname: "alam"
}
```
combined context with data, but in protocol buffer

we define a context such

``` 
message Person {
	string firstname = 1;
	string lastname = 2;
}
```

in this we define our context with an indentifier, with this we send the data like this
126Kousher227alam

the way it is encoding 
`<field_number> + <field_type> + <data>`  
in the 126kousher message 

1 = map to filed = firstname
2 = defined that it is lenght based value
6 = lenght of the data
kousher = data




Protocol Buffer Version = total 3, first version was in internal used in google not published 
- proto2 
- proto3 (current version)


Learning Site 
- https://developers.google.com/protocol-buffers/
- https://developers.google.com/protocol-buffers/docs/reference/javascript-generated
- https://github.com/protocolbuffers/protobuf



Install Protoc - protocol buffer compiler
brew install protobuf 
protoc --version 



Protocol Buffer with javascript 
-------





Language and Platform Neutral. 
Decreasing Message size, thus increasing speed. 
Efficient. 
It support version messages. 


Key Feature of Protocol Buffer
- binary 

Protocol buffer example. 
message Person {
	string name = 1;
	int32 id = 2;
	string email = 3;
}







Defining Message:  
-----------------
We have other option in procol buffer message deinition, such as setting the library name. 




Learning Goal: 
- Defining Messages
- Using Other Features
- Manage Message Revisions 
- Server to server or Server to Client Communication with  protocol buffer
- Creating Message 
- Organizing Protocol Buffer Definition Files
- Version Message 
- Get Started with protocol buffer 



GRPC 
----------

