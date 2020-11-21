---
title: Microsoft Azure CLI
categories: ["azure", "cloud"]
tags: ["azure", "azure-cli"]
layout: blog
thubmail: "/assets/blog/cloud/microsoft-azure-thumb.png"
image: "/assets/blog/cloud/microsoft-azure.png"
description: Microsfot Azure cli is build for easy working with azure. It support all major operating system and installing it is very easy. 
---

# Azure CLI
Azure cli is build for easy working with azure. It support all major operating system and installing it is very easy. 

We can access the azure cli via `az` commnad from the command line.  

After installing the cli tools on local computer then we can run `az login` command to setup our account in azure cli. 


__*Azure cli is integrated in azure portal.*__ 


## Login
to login `az login` use this simple command. 

## Subscription List
to get information about subscription run this command `az subscription list`

## STOP / Deallocated VM 
We can stop and Deallocate a vm, if we just stop it, resource with the vm will be still in use, But with deallocation all resources with vm will be destroyed. 

### $ az vm command
with this command we can start, stop, deallocate resize and do lot of things with our virtual machine. 

`vm deallocate --resource-group <RESOURCE-GROUP-NAME> -name <VM-NAME>`

