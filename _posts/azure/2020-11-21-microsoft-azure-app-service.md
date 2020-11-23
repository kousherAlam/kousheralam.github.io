---
title: Microsoft Azure App Service
categories: ["azure", "cloud"]
tags: ["azure", "App Service", "nodejs", "web application"]
layout: blog
thumbnail: "/assets/blog/cloud/microsoft-azure-thumb.png"
image: "/assets/blog/cloud/microsoft-azure.png"
description: Microsfot Azure App Service is an HTTP based service for hosting web application, Rest APIs, and Mobile backends. 


features: 
  - title: Provisioning
  - title: Deployment
  - title: Load Balancing
  - title: Scaling
  - title: Custom Domain And SSL
  - title: Backup
  - title: High Availability
    subtitle: Ability to use multiple region to support high availability
  - title: Compaliance
    subtitle: App service is ISO, SOC, and PIC Compliant.

application_consideration: 
  - title: Application Lifecycle
  - title: Monitoring
  - title: Scaling
  - title: Debuging
---

# Azure App Service  
In azure it's like Platfrom as a Service (IaaS). App Services Feature are

{% include blog/feature.html features="page.features" %}


## App Service Plan
Defines the resources that will run your web application as well as the the features from the services that will be available for your application. 

- App Service Plan is Region Specific
- Number of vm instances 
- Size of vm instances 
- Pricing Tear

### Pricing Tear Categories
- Shared Compute 
- Dedicated Compute 
- Isolated Compute 


## Scaling App Service Application
- Vertical Scaling / Scale UP : added new resources suche as cpu core. 
- Horizontal Scaling / Scale Out : added new vertual machine on multiple region. 


## Depoloy an Application On App Service Application 
we can deploy our app into azure via deployment center, from where we can select our version control system or we can use our local repository to depoly. and we can setup custom pipeline. 

- deploy 
- redeploy 

After deploying our application it's not over, we need to add new feature over time, or scale if needed. 

{% include blog/feature.html features="page.application_consideration" %}

## Deployment Pipeline 

## Monitoring and Scaling 

## Deployment Slot 
Depolyment slot allow us to multi-enviroment lifecycle on a single app. It enable zero downtime deployment. 

### swaping Slot 
need_to_think_more / study_more


## Monitoring Application
we can monitor an application full via matrix section 

