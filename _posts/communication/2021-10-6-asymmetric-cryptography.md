---
title: Asymmetric Cryptography for Securing Data
published: true
categories: ["Network", "communication", 'Security']
tags: ["Network", 'OpenSSL', 'Certificate', 'RSA', 'SHA256']
layout: blog
thumbnail: "/assets/blog/communication/ssl.jpg"
image: "/assets/blog/communication/ssl.jpg"
description: Todays world is depend on technology and technology depend on data, so in todays world data security does not need any introduction. In the data security world Asymmetric Cryptography is one of most important piller. 
---

Todays world is depend on technology and technology depend on data, so in todays world data security does not need any introduction. In the data security world Asymmetric Cryptography is one of most important piller. 

## Public key infrastructure (PKI)
The public key infastructure is based on trust, when we received a certificate we need to trust the certificate. And there are a thirdparty who asure as that the received certificate is trusted. This third party is a `Certificate Authority` or `(CA)`. 


4 Responsibility of PKI 
1. Authentication 
2. Integrety
3. Confidentiallity: Who has acces to the data only they can access the data
4. Non-Repuclication 

## Certificate Authority (CA)

### Root Certificate authority
- top of the hierarchy 
- not issue any certificate directly, they issue certificate to child CA

### Attribute of Root CA
- Self Signed
- Root CA Kept offline for more security

### Why we have CA Hierarchy ?
- For organization
- Risk Mitigation 

### Criteria of CA
- Issuance Criteria
- Revocation Criteria
- Renewal Criteria

Different level of trust for different CA

### CA Policies


## Encryption and Decryption 
#### private key ot encrypt and public key to decrypt
so then everyone can decrypt the content 
#### public key ot encrypt and private key to decrypt
only private key owner can decrypt the content 


## Signing and Verification of Data
public key sign -> only private key can verify , not ideal and also we will not able to figure out who sign the data.

private key sign -> public key to verify. 



##  Key Pair
Once we generate the key pair this key should be sign by the CA. So it will trasted when we make it publicly available. This process start with a `Generating a Certificate Signin Request`

once that are done then we will fill up some public information about us. This information store as `Distinguis name`


## Fictious Extension 


## Store Key Pair
file format 
- PKCS#12 to store in hard drive, 
- PKCS#11, PKCS#15 for encryption device 

This file use `Safe Bag` Data Strucuture, there are many other data type derive from this data type such as 
- `Key Bag`, `PK CS8` for private key
- `Cert Bag` for Certificate 
- `CRL Bag` for certificate Revocation 
- `Secret Bag` for user define data. 



## X.509 Certificate
PKI certificate type
1. Certificate Request
2. Certificate 
3. Certificate Revocation List

Attribute Certificate: Deal with authorization 


## Privilize Management Infrastrucutre


## TLS / SSL 
Plain old certifiate with some added extentions 

### x.509 certificate strucutre 
- Attach attribute and information to a public key
- Trust comes form third party validation of information 

### Fields 
- version: currently 3
- Serial number: unique with the CA
- Signeture Algorithms: different kind of algorithm is used such as SHA, RSA
- issuer 
- subject 
- extentions 
- validity period 
- public key 


### certificate signeture request 
- version 
- subject 
- public key 
- extension 

after the sign in ca add following attribute
- serial number
- signeture algorithms
- validity period 

other info such as 
- subject 
- public key 
are simply copy form the crertifiate 


this is a subset of x.509 certificate structure 



### Certificate Revocation 

When a certifiate get leak CA add the certifiate serial number in Certification Revocation list 



## Certificate Chain
Each certificate contian a data of it's parent CA Atuhority who sign the certifiate it create a chain. so validate the certificate we check each signeture as we walk back up the chain.



