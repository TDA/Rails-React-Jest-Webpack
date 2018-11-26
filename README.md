# README
This Readme documents the steps I had to follow to get webpacker working with the following config:
* npm
* rails
* react
* webpack
* jest
* sprockets co-existence


## Setting up assets with webpacker
1. Go to Gemfile and add the Webpacker gem.
```
gem 'webpacker'
```
2. Run the command to install:
```
$ bundle install
```

3. Follow this guide to get it working with NPM instead of Yarn: https://itnext.io/how-to-use-webpacker-with-npm-instead-of-yarn-a8a764e3a8ab

4. With the gem installed we need to run the task to setup React and Webpack with Rails. To do that, you need to have ~~Yarn~~ NPM installed from the above step.
```
$ bin/rails webpacker:install
$ bin/rails webpacker:install:react
```

5. Now when you run stuff in `rails server`, you should see a `Webpacker can't find hello_react.js in manifest.json` error.
6. To fix this, [RTFM](https://github.com/rails/webpacker/blob/master/docs/troubleshooting.md#cant-find-hello_reactjs-in-manifestjson). Install the following (as it literally says it in the logs!!):
```
"@rails/webpacker": "~3.5.5",
"babel-preset-react": "6.24.1",
"prop-types": "15.6.2",
"react": "16.6.3",
"react-dom": "16.6.3",
"webpack": "3.12.0",
"webpack-dev-server": "2.11.2"
```
7. Profit. The output of your `rails server` should show something like this when you hit the React endpoint:
```

Started GET "/assets/application.self-e80e8f2318043e8af94dddc2adad5a4f09739a8ebb323b3ab31cd71d45fd9113.css?body=1" for 127.0.0.1 at 2018-11-25 21:47:53 -0800

Started GET "/" for 127.0.0.1 at 2018-11-25 21:48:09 -0800
Processing by HomeController#index as HTML
[Webpacker] Compiling…
[Webpacker] Compiled all packs in /Users/schandramouli/RubymineProjects/Rails-React-Jest-Webpack/public/packs
  Rendered home/index.html.erb within layouts/application (2340.8ms)
Completed 200 OK in 2347ms (Views: 2346.7ms | ActiveRecord: 0.0ms)

Started GET "/assets/home.self-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.css?body=1" for 127.0.0.1 at 2018-11-25 21:48:11 -0800
```
8. If webpacker is missing from that, you did something wrong.
9. Create a random component `HelloReactFromWebpack`
10. Add it in erb file like so:
```
<%= javascript_pack_tag 'hello_react' %>
```


## Setting up assets with Sprockets
1. Add the following to gemfile: `gem 'react-rails'`.
2. Create a components folder inside `app/assets`.
3. Add this to `app/assets/application.js` :
```
//= require react
//= require react_ujs
//= require_tree ./components
//= require_self
```
4. Create a random component `HelloReactFromSprockets`
5. Add this to the erb file:
```
<%= react_component("HelloReactFromSprockets", {name: "Hello Pc"}) %>
```
6. Add this to development.rb: `config.react.variant = :development`
7. Add this to production.rb: `config.react.variant = :production`