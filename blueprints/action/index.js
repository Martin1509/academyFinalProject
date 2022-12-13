const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = {

    description() {
        return 'Generates an multiple action types(separate by comma), action function and adds block to module reducer. Usage: redux generate action moduleName* ACTION_TYPE_1,ACTION_TYPE_2* actionFunctionName';
    },

    beforeInstall(options) {
        if (options.entity.options._.length <= 2) {
            console.log('Missing one of mandatory paramenters - Usage: redux generate action moduleName* ACTION_TYPE* actionFunctionName');
            process.exit();
        }
    },

    afterInstall(options) {
        const cliOptions = options.entity.options._,
                    moduleName = cliOptions[1],
                    actionTypes = cliOptions[2].toUpperCase(),
                    actionName = cliOptions[3],
                    actionsPath = path.resolve(__dirname, '..', '..', 'src', moduleName, 'actions.js'),
                    reducerTestPath = path.resolve(__dirname, '..', '..', options.settings.settings.testBase, moduleName, 'reducers', `${moduleName}-test.js`);

        let actionTypeString = '';
        actionTypes.split(',').forEach((actionType) => {
            actionTypeString += `export const ${actionType}` + ' = `${NAME}/' + actionType + '`;' + os.EOL;
        });

        let actionTypesTestsString = '';
        actionTypes.split(',').forEach((actionType) => {
            actionTypesTestsString += `${os.EOL}    it('should handle ${actionType}', function() {${os.EOL}        throw new Error('Not Implemted');${os.EOL}    });${os.EOL}`;
        });

        // Add new action
        if (actionName) {
            const actionString = `${os.EOL}export const ${actionName} = () => {${os.EOL}${os.EOL}};`;
            fs.appendFile(actionsPath, actionString, function (err) {
                if (err) {
                    console.log('Error during adding action: ', err );
                }
            });
        }

        // Add new action type
        const actionTypesPath = path.resolve(__dirname, '..', '..', 'src', moduleName, 'actionTypes.js');
        fs.appendFile(actionTypesPath, actionTypeString, function (err) {
            if (err) {
                console.log('Error during adding action type: ', err );
            }
        });
        const reducerPath = path.resolve(__dirname, '..', '..', 'src', moduleName, 'reducer.js');

        // Add new action type to reducer test
        fs.readFile(reducerTestPath, 'utf8', function (err, data) {
            if (err) {
                return console.log('Error while adding action to reducer ', err);
            }

            let actionTypesTestsString = '';
            actionTypes.split(',').forEach((actionType) => {
                actionTypesTestsString += `${os.EOL}    it('should handle ${actionType}', function() {${os.EOL}        throw new Error('Not Implemented');${os.EOL}    });${os.EOL}`;
            });

            // Find last }); and replace it with new action tests plus });
            const newContent = data.replace(/([}\;)]+)\s*$/, `${actionTypesTestsString}$1`);
            fs.writeFile(reducerTestPath, newContent, 'utf8', function (err) {
                if (err) {
                    console.log('Error while adding action to reducer ', err);
                }
            });
        });

        fs.readFile(reducerPath, 'utf8', function (err,data) {
          let reducerActionHandlersString = '';
          actionTypes.split(',').forEach((actionType) => {
              reducerActionHandlersString += `case types.${actionType}: {${os.EOL}        ${os.EOL}        }${os.EOL}        `;
          });

          let result = data.replace(/default: {/g, `${reducerActionHandlersString}default: {`);

          fs.writeFile(reducerPath, result, 'utf8', function (err) {
             if (err) {
                console.log('Error while adding action to reducer ', err);
             }
          });
        });
    }
};
