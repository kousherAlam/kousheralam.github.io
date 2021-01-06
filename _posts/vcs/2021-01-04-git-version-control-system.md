---
title: Git - Version Control System
published: true
categories: ["vcs"]
tags: ["git", "github", "vcs"]
layout: blog
thumbnail: "/assets/blog/vcs/git-thumb.jpg"
image: "/assets/blog/vcs/git.jpg"
description: Git track version of our file. It is a version control system commonly known as VCS. In modern software era it is a backbone of any sofisticated software. Microsoft, google, facebook all the big name in the industry use git for their software. 
---

<div class="row">
  <div class="col-12">
    <h2>What is Verson Control System - VCS</h2>
  </div>
  <div class="col-12 col-md-8">
  <p>VCS or Version control system is the backbone of any modern software development. It not only track changes on the code also allow thousand upon thousand developer work on same project concurrently. </p>
  
  <p>VCS allow to manage the version and changes of the file. In software develpment which is the most important things. It also allow us implement different task depend on different situation of code. </p>

  <p>CI/CD one of most popular things now days, VCS allow us to implment this kind of system system. </p>

  <h2 class='font-weight-bold mb-1'>What is git ?</h2>

  <p>Git is a version control software, it is a open source, modern, disributed and most popular version control system. git is very easy to use and support in almost every code hosted server. as git is a distributed system so it keep copy of same file in developer computer, thus it allow to work with out connected with internet. there are a saying about git.</p>

  </div>

  <div class='col-12 col-md-4 p-3'>
    <div class='git-creator'>
      <img src="/assets/blog/vcs/linus-torvalds.jpeg" alt="linus-torvalds"/>
      <p class='small' cite="https://en.wikipedia.org/wiki/Git">Git was created by Linus Torvalds in 2005 for development of the Linux kernel, with other kernel developers contributing to its initial development. Since 2005, Junio Hamano has been the core maintainer.<a href="https://en.wikipedia.org/wiki/Git">Read more</a></p>
    </div>
  </div>
</div>

<blockquote  class="mt-3 mb-3 text-primary text-center border border-info bg-info shadow-sm p-4 text-capitalize h1 font-weight-light" cite="https://twitter.com/nusco/status/1262338029332697091">git is hard to learn, but easy to use.</blockquote>

<div class="mt-4">
  <h3>What is the differennce between git and other vcs system ?</h3>
  <ul>
    <li>Git is Distributed</li>
    <li>Git is Faster for trcking code / text based file.</li>
    <li>Git is not that fast for tracking binary file or video or audio.</li>
  </ul>
  <p class="mb-0">Linus Torvalds talks on git at git</p>
  <div class="text-center">
    <iframe class="w-100" style="min-height: 450px;"  src="https://www.youtube-nocookie.com/embed/4XpnKHJAok8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</div>



<div class="mt-5">
  <h2>State of a file in git</h2>
  <ul>
    <li>Commited: Data in this file in local git database.</li>
    <li>Modified: This file has updated content from git last recorded state. </li>
    <li>Saged: reday for commit after modified</li>
    <li>Untrack File: File is not in git database yet. git will not track it's anything untill we explicitly tell git so. </li>
  </ul>
</div>

<div class="mt-5">
  <h2 class="mb-0">Three state of a git project</h2>
  <div class="row">
    <div class="col-12 col-md-4 p-md-3 p-0">
      <p class="m-0 p-3 bg-primary text-center text-white">Working Directory</p>
      <div class="border border-primary p-2">
        <p>Single copy of one version of the project</p>
      </div>
    </div>
    <div class="col-12 col-md-4 p-md-3 p-0">
      <p class="m-0 p-3 bg-primary text-center text-white">Staging Area (index)</p>
      <div class="border border-primary p-2">
      <p>Area between working directory and .git repository. It allow user to commit multiple file and only track one file.</p>
      </div>
    </div>
    <div class="col-12 col-md-4 p-md-3 p-0">
      <p class="m-0 p-3 bg-primary text-center text-white">.git Directory (Repository)</p>
      <div class="border border-primary p-2">
        <p>In here git store meta data and object database for project</p>
        <p>If any file here, it is commited and sotred in git database</p>
      </div>
    </div>
  </div>
</div>


## git documantation
we can get any help from git cli by typing this command `git help <commang-name>`. 


<div class="mt-5">
  <h2 class="mb-0">Configuring git</h2>
  <p>Git allow us to configure the enviory for global, user and project scope. By configuring git we provide our details and basic info. By <code class="language-plaintext highlighter-rouge">git config</code> command we configure git. </p>
</div>


<div class="mt-5">
  <h2 class="mb-0">Start a new repository and some basic commnad</h2>
  <p>clone             Clone a repository into a new directory</p>
  <p>init              Create an empty Git repository or reinitialize an existing one</p>
</div>


<div class="mt-5">
  <h2 class="mb-0">Tracking files via git</h2>
</div>

<div class="mt-5">
  <h2 class="mb-0">Git Commit</h2>
  `--allow-empty` flag is use to commit with no change. 
  `git commit -a<add-all> -m<add-message>
</div>


<div class="mt-5">
  <h2 class="mb-0">History, Status And travel through time in git</h2>
  git status --short
</div>


<div class="mt-5">
  <h2 class="mb-0">How git track changes when we rename or move a file.</h2>
</div>


<div class="mt-5">
  <h2 class="mb-0">Git Diff</h2>
  git diff --staged 
</div>

<div class="mt-5">
  <h2 class="mb-0">Git Reset</h2>
  <p>A branch in git is a lightweight moveable pointer.</p>
</div>


<div class="mt-5">
  <h2 class="mb-0">Git Branch</h2>
  <p>A branch in git is a lightweight moveable pointer.</p>
</div>

## Remote and Origin in git 


work on the current change (see also: git help everyday)
   add               Add file contents to the index
   mv                Move or rename a file, a directory, or a symlink
   restore           Restore working tree files
   rm                Remove files from the working tree and from the index
   sparse-checkout   Initialize and modify the sparse-checkout

examine the history and state (see also: git help revisions)
   bisect            Use binary search to find the commit that introduced a bug
   diff              Show changes between commits, commit and working tree, etc
   grep              Print lines matching a pattern
   log               Show commit logs
   show              Show various types of objects
   status            Show the working tree status

grow, mark and tweak your common history
   branch            List, create, or delete branches
   commit            Record changes to the repository
   merge             Join two or more development histories together
   rebase            Reapply commits on top of another base tip
   reset             Reset current HEAD to the specified state
   switch            Switch branches
   tag               Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch             Download objects and refs from another repository
   pull              Fetch from and integrate with another repository or a local branch
   push              Update remote refs along with associated objects
