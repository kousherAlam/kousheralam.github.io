---
layout: post
title:  "Webpack : Modern Task Runner"
date:   2018-02-25 18:49:18 +0600
categories: post TaskRunner
short_description: Webpack is a modern task runner, supoort module bundeling by default.Hot module replacement make our workflow more faster & has plugins ecosystems. 
---
<p class="m-b-5">Wnen webapack process your application, it recursively builds a dependency graph that includes every module our application needs, then packages all of those modules into one or more bundles. It is increadibly configureable, but to get start you only need to understand four concepts.</p>
<ul>
  <li>Entry</li>
  <li>Output</li>
  <li>Loaders</li>
  <li>Plugins</li>
</ul>



## Entry 
<p class="m-b-5"> An entry point indicates which module webpack should use to begain building out its internal dependency graph. Every dependency is then processed and outputted into files called bundels. we can point one or multiple files as entry by configuring `entry` property of weback. Single entry [shorthand] Syntax `entry: string|Array<string>. Single Entry does not give enoguh flexibility. We can use Object synstax `entry: {[entryChunkName: string]: string|Array<string>}` .Look at the code</p>
{% highlight javascript %}
const config = {
  entry:{
    app_inline: './src/js/inline/inline.ts',
    app: './src/js/files/app.ts',
    vendors: './src/js/module/vendors.ts'
  }
}
{% endhighlight %}



<h2 class='m-t-40'>Output</h2>
<p class="m-b-5">the output propety tells webapack where to emit the bundles it creates and how to name these filse. We can configure this part of the porcess by specifying and `output` field. the minimum requirement for the `output` property in your webpack config is to set it's value to and object including the following two things: </p>
<ul class="m-t-0">
  <li>A filename to use for the output file(s)</li>
  <li>An absolute path to your preferred output directory</li>
</ul>
<p class="m-b-5">If your configration creates more than a single "chunk" you should use substitutions to ensure that each file has unique name.</p>
{% highlight javascript %}
{
  output: {
    filename: '[name].js',
    path: --dirname+'/dist/js',
  }
}
{% endhighlight %}




<h2 class='m-t-40'>Loaders</h2>
<p class="m-b-5">Leaders enable webpack to process more than just javascript files(webpack itself only understands javascript). They give you the ability to leverage webpack's bundling capabilities for all kinds of files by converting them to valid modules that webpack can process. At a high level loaders have two purposes in your webpack configuration:</p> 
<ul class="m-t-0">
  <li>The test property identifies which file or files should be transformed.</li>
  <li>The use property indicates which loader should be used to do the transforming</li>
</ul>
{% highlight javascript %}
module.exports = {
  module:{
    rules: [
      {test: /\.css$/, use: 'css-loader'},
      {test: /\.ts%/, use: 'ts-loader'}
    ]
  }
}
{% endhighlight %}
<p class="m-b-5">There are three ways to use loadres in your application: </p>
<ul class='m-b-5'>
  <li><strong>Configuration: </strong>(recommended): Specify them in your webpack.config.js file.</li>
  <li><strong>Inline</strong>specify them explicitly in each import statement.</li>
  <li><strong>ClI</strong>Specify them within a shell command.</li>
</ul>
<p class="m-b-5">Module.rules allows you to specify several loaders within your webpack configuration. This is a concise way to display loaders and hlep to maintain clean code. </p>
<p class='m-b-5'>Loader Features</p>
<ul class='m-b-5'>
  <li>Loaders can be chained. They applied in a pipeline to the resouce. A chain of loaders are executed in reverse order. the first loader in a chain of loaders retun a value to the next. At the end loader, webpack expects javascript to be returned.</li>
  <li>Loader can be synchronous or asynchronous</li>
  <li>Loaders run in Node.js and can do everything that's possible there</li>
  <li>Loaders accept query paremeters. This can be used to pass configaration to the loader</li>
  <li>Loadres can also be configured with an options object.</li>
  <li>Plugins can give loaders more features</li>
  <li>Loaders can emit additional arbitrary files</li>
  <li>Normal modules can export a loader in addition to the normal main via package.json with the loader field</li>
</ul>
<p class='m-b-5'>Resolving Loaders</p>
Loaders follow the standard module resolution. In most case it will be loadres form module path. A loader module is experted to export a function and writted in Node.js compartible javascript. They are most commonly managed with npm.






## Plugins
Plugins are the backbone of webpack. webpack itself is build on the same plugin system that you use in your webpack configuration. While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks. Plugins range form bundle optimization and minfication all the way to definging enviroment-like variable. the plugin interface is extremely porwrful and can be used to tackle a wide variety of tasks. In order to use a plugin, you need to `require()` it and add to the  `plugins array`. Most plugins are customizable trough options. Since ou can use a pugin multiple time in a coinfig for different purposes, You need to create and instance of it by calling it with the `new` operator. Since puluin can take argument options, you must pass a `new` instace to the `plugins` property in your webpack configuration. A webpack plugin is a javascript object that has an `apply` property. This `apply` property is called by the webpack compiler, giving access to the entire compilation lifecycle. 
{% highlight javascript %}
  const webpack = require('webpack'); //to access webpack runtime
  const configuration = require('./webpack.config.js');

  let compiler = webpack(configuration);
  compiler.apply(new webpack.ProgressPlugin());

  compiler.run(function(err, stats) {
    // ...
  });
{% endhighlight %}




<h2>Configuration</h2>
webpack's configuration file is a javascript file that export an object. This object then processed by webpack besed upon its defined properties. Because it's a standard node.js commond js module, you can do the following</p>
<ul>
  <li>Import other files via require()</li>
  <li>Use utilites on npm via reuire()</li>
  <li>Use javascript controll flow expressions i.e the ?: operator</li>
  <li>use constants or variable for often used values</li>
  <li>write and execute functions to generate a part of the configuration</li>
</ul>

<h2>Modules && Module Resolution</h2>
<p class='m-b-5'>In modular programming, developers break programs up into discrete chunks of functionality called a module. webpack supports modules written in a variety of languages and preprocessors, via loaders. Loaders describe to webpack how to process non-JavaScript modules and include these dependencies into your bundles. A resolver is a library which helps in locating a module by its absolute path. A module can be required as a dependency from another module as </p>
{% highlight javascript %}
  import foo from 'path/to/module'
  // or 
  require("path/to/module")
{% endhighlight %}
webpack can resolve three kinds of file paths: Absolute | Relative | Module


## Targets
Because JavaScript can be written for both server and browser, webpack offers multiple deployment targets that you can set in your webpack configuration.target can be 'node' | 'web'

## The Manifest


## Hot Module Replacement

