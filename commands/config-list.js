/* ------ Modules ------ */
const fs = require('fs');

/* ------ Helpers ------ */
const config = require('../helpers/config');

/**
 * Lists all the names of the current firebase configs,
 * highlighting the current active config in bold.
 */
function configList() {
  console.log('\nThe following configs have been set up:\n'.bold);

  const activeConfigName = config.getActiveConfigName();

  config.getAllFirebaseConfigs().forEach((configName) => {
    let formattedNameString = '\t' + configName;
    if (activeConfigName && configName === activeConfigName) {
      formattedNameString = formattedNameString.bold + ' - active';
    }
    formattedNameString += '\n';

    console.log(formattedNameString);
  });

  process.exit(0);
}

module.exports = configList;
