/**
 * Данный плагин предназначен для вызова модуля из конкретного чанка при инициализации модуля на клиенте.
 * Решает проблему webpack 4, когда модули из entry не вызываются сами, если используется splitChunks в этот entry.
 */

module.exports = class ModuleExecutorPlugin {
    constructor(options) {
        this.options = options || {};
        this.name = 'ModuleExecutorPlugin';
    }
    apply(compiler) {
        const {chunkName, moduleName, modulePath} = this.options;

        if (!chunkName || !moduleName) {
            return;
        }

        compiler.hooks.compilation.tap(this.name, compilation => {
            compilation.mainTemplate.hooks.startup.tap(this.name, (source, chunk) => {
                const currentChunk = chunk.name;

                if (currentChunk.includes(chunkName)) {
                    const requireFn = compilation.mainTemplate.requireFn;
                    const modules = [...chunk.modulesIterable].filter(m =>
                        m.context && m.context.includes(modulePath)
                        && m.userRequest && m.userRequest.includes(moduleName)
                    );

                    if (modules.length) {
                        const ids = modules
                            .map(m => `'${m.id}'`)
                            .join(',');

                        return `[${ids}].forEach(${requireFn});\n\n${source}`;
                    }
                }

                return source;
            });
        });
    }
};
