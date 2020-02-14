# NPM Library

A template for building nodejs npm libaries with webpack and rollup.

## Features

- Handles ES6 transpiling
- Bundles for browser and commonjs
- Minimizes built files
- Publishes on the built files to npmjs.org
- Excludes the built files from being committed to git

## Usage

1. Change all instances of **library** in the `package.json` file to the name of
   the library being built.
2. Write your code on `src/index.js` file.
3. Run `yarn build` to build files for distribution.
