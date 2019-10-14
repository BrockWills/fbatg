/* ------ Modules ------ */
import colors from 'colors';

/* ------ Helpers ------ */
import config from '../helpers/config';

/**
 * Removes the firebase config with the given name, if it exists.
 */
function removeConfig(name) {
  const boldedName = ('' + name).bold;

  if (!config.getConfig(name)) {
    console.log('\nConfig named ' + boldedName + ' does not exist\n'.red);
    process.exit(1);
  }

  config.removeFirebaseConfig(name);
  console.log('\nConfig ' + boldedName + ' has been removed\n'.green);

  process.exit(0);
}

export default removeConfig;
