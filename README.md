# Tall Street React Starter Kit

Everyone has one, here's mine. Forked from https://github.com/bradleyboy/yarsk

## Features

* [React](http://facebook.github.io/react/), 0.14 of course.
* [Redux](https://github.com/rackt/redux), 3.0.0.
* [Webpack](http://webpack.github.io/) for asset bundling.
* [React Transform](https://github.com/gaearon/babel-plugin-react-transform) enabled out of the box. With [HMR](https://github.com/gaearon/react-transform-webpack-hmr) Changes to React components will show in the browser immediately without a full reload.
* [Babel](https://babeljs.io/) for ES6+ transpilation.
* [SASS](http://sass-lang.com/) (SCSS or Sass style), and [Autoprefixer](https://github.com/postcss/autoprefixer) enabled by default through Webpack.
* Image loaders setup and ready to go so you can reference your images as `require()` statements in JS, or just use `url()` as usual in CSS and Webpack will take care of the rest.
* [Mocha](http://mochajs.org/) for testing. 
* Built-in command for publishing your app to GitHub pages. See [Building](https://github.com/tallstreet/starter-kit#building) below for more info.
* [Optional support for ESLint via babel-eslint](https://github.com/tallstreet/starter-kit#linting).

## Usage

Fork this repo, then run:

```
npm install
npm start
```

That will fire up a webpack dev server in **hot** mode. Most changes will be reflected in the browser automatically without a browser reload. You can view the app in the browser at `http://localhost:8080`.

## Building

To generate a production build, run:

```
npm run build
```

The above command will generate a `dist` folder with the appropriate index.html file along with the minified CSS and JS files.

You can also automatically publish to GitHub pages. Just run this instead of the regular build command:

```
npm run build:gh
```

You can then view your app at `http://[yourgithubusername].github.io/[reponame]`. For example, you can load this demo at http://bradleyboy.github.io/yarsk.

## Modifying the HTML

The HTML file is generated using the `index.html` file. This file is used for both the development and production build.

## Tests

The tests use Mocha. See the example test in `app/components/Header/tests/index_test.js`. The test suite can be run like so:

```
npm test
```

To run the tests in watch mode (tests will re-run each time a file changes), use this instead:

```
npm run test:watch
```

Finally, the repo is [Travis](https://travis-ci.org) ready. The `.travis.yml` file should work out of the box, just add your repo in Travis.

## Linting

If you'd like your JavaScript to be linted, copy the `.eslintrc.example` to `.eslintrc`. I've included my own defaults, feel free to modify them to your own taste. For more information on configuring ESLint, [consult its documentation](http://eslint.org/docs/rules/). Linting is run before each webpack build when a `.eslintrc` file is present.

## .editorconfig

An example `.editorconfig` file is provided with sensible defaults for JavaScript. Feel free to modify `.editorconfig.example` to match your own preferences, then renamed the file to `.editorconfig` and use an IDE or editor that supports [EditorConfig](http://editorconfig.org/).
