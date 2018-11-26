# README
This Readme documents the steps I had to follow to get webpacker working with the following config:
* NPM (no Yarn)
* Rails
* React
* Webpack for compiling assets the JS way
* Jest and Enzyme for React testing
* Sprockets for compoiling assets the Rails way
* Co-existence of Sprockets and Webpack


## Setting up assets with webpacker
1. Go to Gemfile and add the Webpacker gem.
```
gem 'webpacker'
```
2. Run the command to install:
```
$ bundle install
```

3. Follow this guide to get Webpacker working with NPM instead of Yarn: https://itnext.io/how-to-use-webpacker-with-npm-instead-of-yarn-a8a764e3a8ab

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


## Setting up Jest
Note: Jest can only be setup with webpack version of React components: https://github.com/reactjs/react-rails/issues/226
```
Testing React with jest has one major prerequisite, that you structure your components as CommonJS modules. So there's (i think) no real way of using jest if you're using the "naive" way of structuring your components in the rails asset pipeline.
```

Most of this is better explained here: https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f
I have updated this Readme with other additions that are useful.

1. Install Jest and Friends:
```
npm i jest babel-jest react-test-renderer babel-preset-env babel-preset-react enzyme enzyme-adapter-react-16 enzyme-to-json -D
```
2. Setup the config for Jest in `package.json`.

    2.1. `moduleDirectories` is set to anything you Jest to search for modules used in your source. Set this up right so you
    don't need super long paths like `../../../app/javascript/components/myComponent`, and instead use `import myComponent`

    2.2. `roots` is the test root folder. This can be `test/` or `spec/` depending on your rails folder config.

    2.3. `setupFiles` is for all the code that runs before your tests start.

    2.4. `snapshotSerializers` gives you the enzyme to json adapter, that automatically serializes and de-serializes your snapshots.
```
/* Append to your package.json */
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
},
"jest": {
  "setupFiles": ["./test/javascript/jestSetup.js"],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "roots": [
    "test/javascript"
  ],
  "moduleDirectories": [
    "node_modules",
    "app/javascript"
  ]
}
```
Note: Jest will look for files to run and will match the files with *spec.js or *test.js, so it is important to set the root for Jest otherwise it will try to run test.js on config/webpack as a test.

3. Setup the setup file for Jest (lol):
```
// in jestSetup.js
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// So you dont need to manually set React up in every test file. Also helps with ESLint.
global.React = React;
global.ReactDOM = ReactDOM;
```


Ref:
1. http://blog.plataformatec.com.br/2018/05/setting-up-rails-with-webpacker-react-and-jest/
2. https://medium.com/@kylefox/how-to-setup-javascript-testing-in-rails-5-1-with-webpacker-and-jest-ef7130a4c08e
3. https://itnext.io/how-to-use-webpacker-with-npm-instead-of-yarn-a8a764e3a8ab
4. https://github.com/rails/webpacker/blob/master/docs/troubleshooting.md#cant-find-hello_reactjs-in-manifestjson
5. https://github.com/reactjs/react-rails/issues/226
6. https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f
7. https://github.com/reactjs/react-rails#use-with-asset-pipeline