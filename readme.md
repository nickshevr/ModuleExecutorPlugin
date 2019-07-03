# ModuleExecutorPlugin

This webpack plugin executes the code which was extracted from your entry by split chunks plugin. Webpack 4 treats it as a dependecy code rather than an exectutable code. This plugin addresses this issue.

## Install

`npm install module-executor-plugin --save-dev`


## Usage

Add to your webpack 4 config:

```js
// webpack.config.js

const ModuleExecutorPlugin = require('module-executor-plugin')

module.exports = {
  // contents of your plugin
  plugins: [
    new ModuleExecutorPlugin({
      chunkName: 'vendor',
      moduleName: 'myModule.js',
      // optional for mono-repo
      // modulePath: `platform.${platform}/modules`,
    }),

    // other plugins
  ]
}
```
