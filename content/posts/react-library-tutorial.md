---

type: "post"
title: "Creating a Component Library for React with Babel 7 and Jest"
category: "Tutorial"
date: "2018-12-06"
slug: "/react-component-library-tutorial"
postImage: "./img/the-trees.jpg"
metaDescription: "Learn to create a React component library with Babel 7 and Jest. This tutorial will walk you through setting up a new package to be installed by npm."

---


Recently I was considering creating a reusable component pack to share across projects. Reusable components keep sites visually clean and consistent. Component libraries also promote DRY (Don't Repeat Yourself) codebases. What's not to like?

You will need a basic experience with React, Javascript, and the command line to follow along. At the end of this tutorial, you'll have a working React package with unit tests powered by Jest. Let's get started setting it up.

**In a rush? Check out the [code on github](https://github.com/madelyneriksen/react-library-tutorial) to see the end result.**

## Project Initialization

Let's bootstrap our library with `npm init`:

```bash
mkdir my-library
cd my-library
npm init
# npm will ask us some questions here
package name: my-library
version: 0.1.0
description: A simple React library.
entry point: dist/index.js
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

We need Babel for transpiling JSX and ES6 syntax into regular old javascript, otherwise browsers won't understand our code. Additionally we need a couple of extra packages for Babel/Jest compatibility.

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

Let's talk about each of these packages and why we need them!

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

We've installed the packages we need for creating our library, but as it stands we don't have any way to use them. We need to create some configuration.

In the root of your project, create a file named `.babelrc` with the following content:

```json
{
  "presets": ["@babel/react", "@babel/env"]
}
```

Your `.babelrc` file tells Babel what options you'd like it to use. Here, we specify some presets for transpiling React and ES6. These reference the packages we installed earlier, but note they **do not** match them exactly!

Since we're doing chores, let's finish up project configuration by making some changes to our `package.json` file. In the `scripts` section, let's write in the following lines:

```javascript
{
  // Package metadata...
  scripts: {
    "test": "jest",
    "build": "babel src --out-dir dist --copy-files",
  }
}
```

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
Tests: 1 passed, 1 total.
```

Everything is looking good! Our package is passing its test, babel is compiling things just fine, and jest looks like it's working great. Our next step is publishing!

## Prepping for (A Local) Publish

At this point in the tutorial, you have a working babel setup, unit tests running, and a basic React component. Let's take a look at what we need for publishing this!

If you haven't already, now is a good time to create a git repository for your package. We should create a `.gitignore` file so we don't commit what we don't need to:

```
# .gitignore

node_modules/
dist/

# We can ignore archives, we will be creating one shortly:
*.tgz
```

We ignored `dist/` because it isn't relevant to our source code. This is mostly personal preference; commit it if you'd like. 

Interestingly, npm will use your `.gitignore` file alongside its own `.npmignore` file. However, we're going to create a `.npmignore` file here for some additional control:

```
# .npmignore

src/
tests/
.babelrc
!dist/
```

This will prevent us from packing up our source code, tests, and `.babelrc` into our package. Putting a bang in front of `dist/` tells `.npmignore` to ignore the rule created by `.gitignore`.

That's it! We're good to go from here. We can test how our package will work with a handy command called `npm pack`. It creates a tarball of a local package, preventing common issues with symlinks.

Build your package with Babel, pack it, and test it out!

```bash
# Build using our Babel command
npm run build
Successfully compiled 1 file with Babel
# Let's ship!
npm pack
=== Tarball Contents ===
package.json
README.md
dist/index.js
```

Let's say you have a project made with `create-react-app`. You can verify your package works by running `npm install` on the tarball:

```bash
# From your React project
npm i /path/to/my-library-0-1-0.tgz
...
Added 1 package from 1 contributor and audited 1 package in .526s
found 0 vulnerabilities
```

Now, you can use your package and React component from your project:

```jsx
import React from 'react';
import { MyComponent } from 'my-library';

export default () => (
  <div>
    <h1>Hey, look!</h1>
    <MyComponent />
  </div>
)
```

## Wrapping Up

You have just created a React library from start to finish, with unit tests, modern Javascript, and build tools. That's a big accomplishment, so give yourself a high five and then get coding!!

If you had any issues or would like to suggest edits, please feel free to [contact me](/contact) directly or open an issue on [github](https://github.com/madelyneriksen/react-library-tutorial). Alternatively, let me know if you found this article helpful!
