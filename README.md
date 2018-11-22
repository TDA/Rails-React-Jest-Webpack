== README
This Readme documents the steps I had to follow to get webpacker working with the following config:
* npm
* rails
* react
* webpack
* jest
* sprockets co-existence


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
6. To fix this, RTFM. Install the following (as it says it in the logs!!):
```
"@rails/webpacker": "~3.5.5",
"babel-preset-react": "6.24.1",
"prop-types": "15.6.2",
"react": "16.6.3",
"react-dom": "16.6.3",
"webpack": "3.12.0",
"webpack-dev-server": "2.11.2"
```
7. Profit.