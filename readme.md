# ModuleExecutorPlugin

## Install

`npm install module-executor-plugin --save-dev`


### How to use

Add to your webpack 4 config:

```
 new ModuleExecutorPlugin({
    chunkName: 'vendor',
    moduleName: 'myModule.js',
    // optional for mono-repo
    // modulePath: `platform.${platform}/modules`,
}),
```

