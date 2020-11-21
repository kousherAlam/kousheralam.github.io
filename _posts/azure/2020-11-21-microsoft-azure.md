---
title: Azure
categories: ["azure", "nodejs", "cloud"]
tags: ["azure", "nodejs", "basic"]
layout: blog
image: "/assets/blog/cloud/microsoft-azure.png"
description: Microsfot Azure one of the big player of cloud computing market. 
---

# Azure 


## Azure Region & Geographic and Availability Zones
Azure has it's data center all over the worlds. In every data center azure have multiple of availability zone.

### Availability Zones
This are separate physical locations within some region which has separe data center for high availability. Meaning if in a region on data center fail then other available data center will take it's place. When we deploy our code , we can choose the regiion specificly. 

### Geographic 
Group of regional data center. Sometimes there are some restriction where user data can be store and can not, then come Geographic in place. 


## What Azure Provide

### Infostructure as Service [IaaS]

### Platform as Service [PaaS]


### Software as Service [SaaS]




## Creating Virtual Machine On Azure 

### Size of Vritual Machine 
### Virtual Machine Series 
- D Series for general Purpose 
- N Series is build with GPU 

### Connecting with virtual machine 


## Azure Resource Group 
Logical group of resources on azure. By Create resource group we can control all the related resource from one central group. 


## Network Security Group 



## Azure CLI
Azure cli is build for easy working with azure. It support all major operating system and installing it is very easy. 

We can access the azure cli via `az` commnad from the command line.  

After installing the cli tools on local computer then we can run `az login` command to setup our account in azure cli. 

### STOP / Deallocated VM 
We can stop and Deallocate a vm, if we just stop it, resource with the vm will be still in use, But with deallocation all resources with vm will be destroyed. 

#### $ az vm command
with this command we can start, stop, deallocate resize and do lot of things with our virtual machine. 

`vm deallocate --resource-group <RESOURCE-GROUP-NAME> -name <VM-NAME>`

