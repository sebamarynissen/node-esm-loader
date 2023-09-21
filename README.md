# node-esm-loader

> A webpack-like loader library for Node

**DISCLAIMER** Loaders [are still experimental](https://nodejs.org/api/esm.html#esm_experimental_loaders) in Node and may still change, which means this module is still experimental as well.
Use at own risk and **DO NOT** rely on it in production.

Node 14 provides full support for native ES Modules without the need for transpilation.
While CommonJS is likely not to go anywhere soon, it is good practice to at least start thinking about migrating your codebase from CommonJS to ESM.
In the `require`-world, we had [require.extensions](https://nodejs.org/api/modules.html#modules_require_extensions) if we wanted to load non-JS files into Node.
You could use this, for example, to load TypeScript files and compile them just-in-time.
While this was not a good idea in production, it was a nice to have in development.
For example, you could run tests without having to transpile them first.

In the ESM world we no longer have `require.extensions`, but Node provides us with [loader hooks](https://nodejs.org/api/esm.html#esm_experimental_loaders) which can be used to provide the same functionality, and even more.
The goal of this module is to make it easier to write such loaders, especially when composing loaders.
It is **strongly disadvised** to use this module in production.
The aim is not to eliminate the necessity of a build step, but to make your life easier **during development**.

This module is a simple wrapper around [create-esm-loader](https://www.npmjs.com/package/create-esm-loader) to make it easier to set up a loader.
In [create-esm-loader](https://www.npmjs.com/package/create-esm-loader) you have to manually initialize, configure and export your loader, but this module reduces that so that all you need to do is *configure* the loader.
This will - hopefully - eliminate the need to reconfigure your loaders when the Node loader api changes.

## Installation

```npm install --save-dev node-esm-loader```

## Usage

`node-esm-loader` will automatically export a loader based on how you configured it.
You can use it by running Node as
```
node --experimental-loader=node-esm-loader ./your/file.js
```
On Node `>=20.7` however, [it is discouraged](https://nodejs.org/dist/latest-v20.x/docs/api/cli.html#--experimental-loadermodule) to use the `--experimental-loader` flag and instead the `--import` flag should be used in combination with `register()` from `node:module`
```js
import { register } from 'node:module';
register('node-esm-loader', import.meta.url);
```
or make it easy on yourself and just use
```sh
# Preferred pattern on Node >=20.7
node --import=node-esm-loader/register ./your/file.js
```

`node-esm-loader` loader will subsequently look for a `.loaderrc.mjs` or `.loaderrc.js` file that exports the configuration.
This file can look something like this:
```js
export default {
  loaders: [
    'vue-esm-loader',
    {
      test: /\.(png|gif|jpe?g)$/,
      type: 'asset/resource',
    },
    {
      transform(source, opts) {
        return { source: someTransformation(String(source)) };
      }
    },
  ],
};
```

Alternatively you can run node with an additional flag that specifies the path to your loader configuration
```sh
node --experimental-loader=node-esm-loader ./your/file.js --loader-config=./path/to/config.js

# On Node >=20.7
node --import=node-esm-loader/register ./your/file.js --loader-config=./path/to/config.js
```

When using this with mocha, create a `.mocharc.cjs` file that looks like this:
```js
module.exports = {
  'experimental-loader': 'node-esm-loader',

  // On Node 20.7
  import: 'node-esm-loader/register',

};
```

For more info on what the loaders configuration should look like, have a look at [create-esm-loader](https://www.npmjs.com/package/create-esm-loader).

## Compatible Loaders

You can find a [list of compatible loaders][loaderlist], here:

[loaderlist]: https://www.npmjs.com/package/create-esm-loader?activeTab=dependents
