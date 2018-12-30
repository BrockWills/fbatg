/* ------ Modules ------ */
const fs = require('fs');
const path = require('path');

/* ------ Helpers ------ */
const config = require('../helpers/config.js');

/**
 * Switches the currently active firebase config to the
 * given named config, (if it exists).
 */
function switchConfig(name) {
  if (!getConfig(name)) {
    console.log('\nConfig named ' + ('' + name).bold + ' does not exist\n'.red);
    process.exit(1);
  }

  config.updateActiveConfig(name);
  console.log('\nThe current active config is now ' + ('' + name).bold + '\n'.green);

  process.exit(0);
}

module.exports = switchConfig;
