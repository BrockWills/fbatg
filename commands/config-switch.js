/* ------ Modules ------ */
import fs from 'fs';
import path from 'path';

/* ------ Helpers ------ */
import config from '../helpers/config';

/**
 * Switches the currently active firebase config to the
 * given named config, (if it exists).
 */
function switchConfig(name) {
  if (!config.getConfig(name)) {
    console.log('\nConfig named ' + ('' + name).bold + ' does not exist\n'.red);
    process.exit(1);
  }

  config.updateActiveConfig(name);
  console.log('\nThe current active config is now ' + ('' + name).bold + '\n'.green);

  process.exit(0);
}

export default switchConfig;
