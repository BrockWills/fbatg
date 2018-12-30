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

  const activeConfig = config.getActiveConfig();

  config.getAllFirebaseConfigs().forEach((configName) => {
    let formattedNameString = '\t' + configName + '\n';
    if (activeConfig && configName === activeConfig.name) {
      formattedNameString = formattedNameString.bold + ' - active';
    }

    console.log(formattedNameString);
  });

  process.exit(0);
}

module.exports = configList;
