---

type: "post"
title: "Creating a Component Library for React with Babel 7 and Jest"
category: "Tutorial"
date: "2018-12-06"
slug: "/react-component-library-tutorial"
postImage: "./img/creek.jpg"
metaDescription: "Learn to create a React component library with Babel 7 and Jest. This tutorial will walk you through setting up a new package to be installed by npm."

---

Recently I was considering creating a reusable component pack to share across projects. Reusable components keep sites visually clean and consistent. Component libraries also promote DRY (Don't Repeat Yourself). What's not to like?

For better or worse, the Javascript world moves very fast, and I had a hard time finding up to date instructions for packaging react components using the new Babel 7.

So without further ado, here are the steps I came up with for creating what I will call 'a minimally viable react library'.

## Project Initialization

Let's bootstrap our library with `npm init`:

```bash
mkdir my-library
cd my-library
npm init
# npm will ask us some questions here
package name: my-library
version: 0.1.0
main: dist/index.js
test command: jest
git repo: <Your github repo, if you want>
keywords: My first Library!
author: <That's you!>
license: <Your license>
```

This will create our `package.json`, which is basically a project configuration. If you're familiar with Python, it's like a `setup.py` file.

The most important part from this section is setting the entry point to `dist/index.js`. That's where Babel will place our compiled files!

## Installing our packages

We're going to be using [Babel 7](https://babeljs.io/blog/2018/08/27/7.0.0), which was released mid-2018. All of the packages are under the new `@babel` namespace.

We need Babel for transpiling JSX and ES6 syntax into regular old javasscript, otherwise browsers won't understand our code. Additionally we need a couple of extra packages for Babel/Jest compatibility.

Here's what we'll install:

```bash
# All of our babel packages
npm i --save-dev @babel/core @babel/cli \
@babel/preset-env @babel/preset-react
# Now we can install Jest and dependencies
npm i --save-dev jest babel-jest \
babel-core@^7.0.0-bridge.0 regenerator-runtime
# Of course we need React too
npm i --save-dev react react-dom
```

I'm not a fan of blindly installing software, so let's talk about each of these packages and why we need them:

* `@babel/core` - This is the main Babel package for transpiling
* `@babel/cli` - Command line wrapper for Babel
* `@babel/preset-env` - Babel preset for ES6+ to regular JS
* `@babel/preset-react` - Babel preset for JSX and other React helpers.
* `@babel/jest` - Babel plugin for jest compatibility
* `jest` - Our unit testing framework
* `babel-core@^7.0.0-bridge.0` - Compatibility package to let older package configs work with the newer babel package names.
* `regenerator-runtime` - ES6 to ES5 regenerator for Jest.

These are all the packages we need for creating a minimal package. You don't strictly need webpack for the build and distribution; however if you'd like the dev server go ahead and add it!

## Adding configuration

`TODO: Show the reader what configuration is needed for the project, including our build script and .babelrc`

## Writing The Code

You made it to the good part! 🙌 Give yourself a pat on the back for making it this far.

We have a working project set up, but have no code to build and package! Let's change that now. Like a lot of other packages, we'll put our source code in the `src/` directory:

```bash
mkdir src/
touch src/index.js
```

In our newly created `index.js` file, let's add a super simple react component:

```javascript
// src/index.js

import React from 'react';


const MyComponent = () => (
  <h1>Hello World! This is my component!</h1>
)

module.exports = {
  MyComponent
}
```

Yep, that's 2,000+ github stars just waiting to happen. Everyone will love this package! Though, we should write some tests for our component. I keep mine in a directory called `tests/`, but you can do what you like:

```bash
mkdir tests/
touch tests/my-component.test.js
```

Let's add a simple smoke test to our file. Smoke tests are great because they help you preserve your sanity as well as prevent accidental breaking changes over silly mistakes.

```javascript
// tests/my-component.test.js

import React from 'react';
import ReactDOM from 'react-dom';
import { MyComponent } from '../src/index.js';

it("renders without crashing", () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
})
```

Sweet, we have our test written. Let's try it out using npm:

```bash
npm run test
# Whole lot of long jest output...
1 of 1 passed!
```

Everything is looking good! Our package is passing its test, babel is compiling things just fine, and jest looks like it's working great. Our next step is publishing!

## Prepping for (A Local) Publish

`TODO: Tell the reader how to setup a .npmignore, .gitignore, and use npm pack.`
