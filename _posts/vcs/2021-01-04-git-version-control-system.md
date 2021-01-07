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


## Git Documantation From CLI
we can get any help from git cli by typing this command `git help <commang-name>`. 


<div class="mt-5">
  <h2 class="mb-0">Configuring git</h2>
  <p>Git allow us to configure the enviory for global, user and project scope. By configuring git we provide our details and basic info. By <code class="language-plaintext highlighter-rouge">git config</code> command we configure git. </p>
</div>


<div class="mt-5">
  <h2 class="mb-0">Start a new repository and some basic commnad</h2>
  <p>clone             Clone a repository into a new directory</p>
  <p>init              Create an empty Git repository or reinitialize an existing one</p>   
  <p>fetch             Download objects and refs from another repository</p>
  <p>pull              Fetch from and integrate with another repository or a local branch</p>
  <p>push              Update remote refs along with associated objects</p>
  <p>add</p>
  <p>commit</p> 
</div>


<div class="mt-5">
  <h2 class="mb-0">Tracking files via git</h2>
</div>

<div class="mt-5">
  <h2 class="mb-0">Working on the current change</h2>
  `--allow-empty` flag is use to commit with no change. 
  `git commit -a<add-all> -m<add-message>
  <h3>Git commit guideline</h3>
  <p>add               Add file contents to the index</p>
  <p>mv                Move or rename a file, a directory, or a symlink</p>
  <p>restore           Restore working tree files</p>
  <p>rm                Remove files from the working tree and from the index</p>
  <p>sparse-checkout   Initialize and modify the sparse-checkout</p>
</div>


<div class="mt-5">
  <h2 class="mb-0">History, Status And travel through time in git</h2>
  git status --short
  <p> bisect            Use binary search to find the commit that introduced a bug</p>
  <p>diff              Show changes between commits, commit and working tree, etc</p>
  <p>grep              Print lines matching a pattern</p>
  <p>log               Show commit logs</p>
  <p>show              Show various types of objects</p>
  <p>status            Show the working tree status</p>
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
  <p>Allow us to changes commited.</p>
  git reset --soft : commit back to stagin area
  git reset --mixed - move change back to working directory
  git reset --hard move changes to trash  

</div>
https://git-school.github.io/visualizing-git/

<div class="mt-5">
  <h2 class="mb-0">Remove file from git</h2>
  `git rm  <file_name>` --cached 
</div>

<div class="mt-5">
  <h2 class="mb-0">Git Branch and more tools</h2>
  <p><span class="font-weight-bold">branch</span> List, create, or delete branches</p>
  <p><span class="font-weight-bold">commit</span> Record changes to the repository</p>
  <p><span class="font-weight-bold">merge</span>  Join two or more development histories together</p>
  <p><span class="font-weight-bold">merge</span>  Join two or more development histories together</p>
  <p><span class="font-weight-bold">merge</span>  Join two or more development histories together</p>
  <p><span class="font-weight-bold">rebase</span> Reapply commits on top of another base tip</p>
  <p><span class="font-weight-bold">reset</span>  Reset current HEAD to the specified state</p>
  <p><span class="font-weight-bold">switch</span> Switch branches</p>
  <p><span class="font-weight-bold">tag</span> Create, list, delete or verify a tag object signed with GPG</p>
  
  <p>A branch in git is a lightweight moveable pointer. It allow us to do make and maintain concurrent change on on project. which is very, very  helpful. Suppose we are working on a project and after sometime we want to test some of our code and feature, so in git we can create a branch for that and make or changes and maintain it on that brach without effecting others code.</p>

  to create branch we use `git branch <branch-name>` command. and for switch branch we use `git checkout -b <branch-name>` command. 
  some of the git branch related command

  - to See all branch use `git branch` command it will list all branch and will show which one is currently using. 
  - to go to another branch `git checkout -b <branch-name>`
  - to rename a branch use `git branch -m <oldBranchName> <newName>`
  - to delete a branch use `git branch -d <branch-name>` to force the command use `-D` command. 

  ## Comparing and merging brances
  - git merge branchToMarge
  ### Fast Forward Merge 
  target and source 
  target: Refers to the branch that we want to modify by merging changes in
  sources: Refers to the branch that has the changes we want. 
  Whe we merge only the target branch changes. source is not changes while merge.s

  - first we need to switch to the target branch by running `git chekcout <target-branch> `
  - then merge the change with `git merge <source-branch>` command. 

  git diff can be use to compare branches 
  
  git diff branch1 branch2 to see the changes between the two brances, it is a report only task. do not change anything on the file systems. 

  
  ## Git rebase - pick, squase, rebase
  it use to clean the branches, it increase accuracy and clearity. 

  - clean up local history before sharing 
  - pull changes form another branch without performing merge.s
  


  - do not use rebase on a public branch. 
  - do not use rebase anywhere , shome of the
  - do not use rebase 


  ## git feflog

  ## git cherry-pick 

  
</div> 




<div class="mt-5">
  <h2 class="mb-0">Remote and Origin in git </h2>
</div>
