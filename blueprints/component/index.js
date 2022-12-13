const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = {

    description() {
        return 'Generates a pure component and container for given module. Usage: redux generate component [moduleName] [componentName]';
    },

    beforeInstall(options) {
        if (options.entity.options._.length < 3) {
            console.log('Missing one of mandatory paramenters - Usage: redux generate component [moduleName] [componentName]');
            process.exit();
        }
    },

    locals: function (options) {
        // Load prop definition from command line parameters
        let propsDef = options.entity.options._.filter((param) => {
            return param.indexOf(':') !== -1
        });

        let props = [];
        propsDef.forEach((propDef) => {
            let prop = propDef.split(':');
            props.push({
                name: prop[0],
                type: prop[1]
            });
        });

        let propsString = '';
        props.forEach((prop) => {
            propsString += os.EOL + '\t' + prop.name + ': ' + prop.type + ','
        });

        if (props.length > 0) {
            propsString = propsString.slice(0, -1);
        }

        const name = options.entity.options._[2]
            .split(/[-_]/)
            .map((word, index) => index ? word.substring(0, 1).toUpperCase() + word.substring(1) : word)
            .join('');
        return {
            name: name.substring(0, 1).toLowerCase() + name.substring(1),
            moduleName: options.entity.options._[1],
            componentName: name.substring(0, 1).toUpperCase() + name.substring(1),
            containerName: `${name.substring(0, 1).toUpperCase() + name.substring(1)}Container`,
            cssName: name.substring(0, 1).toLowerCase() + name.substring(1),
            propsString: propsString
        };
    },

    fileMapTokens() {
        return {
            __module__: function(options) {
                return options.locals.moduleName;
            },
            __name__: function(options) {
                return options.locals.name;
            },
            __container__: function (options) {
                return options.locals.containerName;
            },
            __component__: function (options) {
                return options.locals.componentName;
            },
            __css__: function (options) {
                return options.locals.cssName;
            },
            __test__: function(options) {
                return 'test';
            }
        }
    },

    appendAction(options) {
        const locals = this.locals(options);
        const srcIndexPath = path.resolve(__dirname, '..', '..', 'src', options.entity.name, 'actions', 'index.ts');
        const exportString = `export * from './${locals.name}';` + os.EOL;

        fs.appendFileSync(srcIndexPath, exportString, function (err) {
            if (err) {
                console.log('ERROR: wasnt able to append export for action', err);
            }
        });
    },

    appendActionType(options) {
        const locals = this.locals(options);
        const srcIndexPath = path.resolve(__dirname, '..', '..', 'src', options.entity.name, 'actionTypes', 'index.ts');
        const exportString = `export * from './${locals.name}';` + os.EOL;

        fs.appendFile(srcIndexPath, exportString, function (err) {
            if (err) {
                console.log('ERROR: wasnt able to append export for actionType', err);
            }
        });
    },

    appendReducer(options) {
        const locals = this.locals(options);
        const srcIndexPath = path.resolve(__dirname, '..', '..', 'src', options.entity.name, 'reducer', 'index.ts');

        let reducerString = fs.readFileSync(srcIndexPath, 'UTF-8');
        let index = reducerString.indexOf('export const initialState');

        reducerString = reducerString.slice(0, index - 2)
            + `${os.EOL}import ${locals.name}, {initialState as ${locals.name}InitialState} from './${locals.name}';`
            + reducerString.slice(index - 2);

        index = reducerString.indexOf('};');
        reducerString = reducerString.slice(0, index - 1)
            + (reducerString[index - 2] === '{' ? '' : ',')
            + `${os.EOL}    ...${locals.name}InitialState`
            + reducerString.slice(index - 1);

        index = reducerString.lastIndexOf(');');
        reducerString = reducerString.slice(0, index - 1)
            + `,${os.EOL}    ${locals.name}`
            + reducerString.slice(index - 1);

        fs.writeFileSync(srcIndexPath, reducerString, 'UTF-8');
    },

    appendComponent(options) {
        const locals = this.locals(options);
        const srcIndexPath = path.resolve(__dirname, '..', '..', 'src', options.entity.name, 'components', 'index.ts');
        const exportString = `export {default as ${locals.componentName}} from './${locals.componentName}';` + os.EOL;

        fs.appendFile(srcIndexPath, exportString, function (err) {
            if (err) {
                console.log('ERROR: wasnt able to append export for component ', err);
            }
        });
    },

    afterInstall(options) {
        this.appendComponent(options);
        this.appendAction(options);
        this.appendActionType(options);
        this.appendReducer(options);
    }
};
