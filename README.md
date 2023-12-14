# node-esm-loader

> A webpack-like loader library for Node

**DISCLAIMER** Loaders [are still experimental](https://nodejs.org/api/esm.html#esm_experimental_loaders) in Node and may still change, which means this module is still experimental as well.
Use at own risk and **DO NOT** rely on it in production.

This module is a simple wrapper around [create-esm-loader](https://www.npmjs.com/package/create-esm-loader) to make it easier to set up a loader.
In [create-esm-loader](https://www.npmjs.com/package/create-esm-loader) you have to manually initialize, configure and export your loader, but this module reduces that so that all you need to do is *configure* the loader.

## Installation

```npm install --save-dev node-esm-loader```

## Usage

`node-esm-loader` will automatically export a loader based on how you configured it.
You can use it by running Node as
```
node --import=node-esm-loader/register ./your/file.js
```

Or you can use the JavaScript api
```js
// # register.js
import { register } from 'node:module';
register('node-esm-loader', import.meta.url, {

  // Optional, will use the default .loaderrc.js config file if present
  loaderConfig: './path/to/config.js',

});
```
and then run Node as
```
node --import=./register.js ./your/file.js
```
For more info about this, see https://nodejs.org/api/module.html#customization-hooks

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

If you want to store the loader config in a different file, you can use
```
node --import=node-esm-loader/register ./your-file.js --loader-config=./path/to/config.js
```

When using this with mocha, create a `.mocharc.cjs` file that looks like this:
```js
module.exports = {
  import: 'node-esm-loader/register',
};
```

For more info on what the loaders configuration should look like, have a look at [create-esm-loader](https://www.npmjs.com/package/create-esm-loader).

## Compatible Loaders

You can find a [list of compatible loaders][loaderlist], here:

[loaderlist]: https://www.npmjs.com/package/create-esm-loader?activeTab=dependents
