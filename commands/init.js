/* ------ Modules ------ */
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

/* ------ Helpers ------ */
import config from '../helpers/config';

/**
 * Initialises the CLI from a JSON file that contains all the necessary firebases details.
 *
 * Optionally, set a name for the configuration - the name will be set to `default` if no
 * name parameter is set.
 */
function init(configPath, cmd) {
  if (!fs.existsSync(configPath)) {
    console.log(('\nFile `' + configPath + '` does not exist\n').bold.red);
    return;
  }

  const configString = fs.readFileSync(configPath, 'utf8');
  let newConfig;
  try {
    newConfig = JSON.parse(configString);
  } catch(e) {
    console.log('\nConfig file must be valid json\n'.bold.red);
    return;
  }

  const fields = ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'storageBucket', 'messagingSenderId'];

  const resultingConfig = {};
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (!newConfig[field]) {
      console.log(('\n' + field + ' is required in your config file\n').bold.red);
      return;
    }

    resultingConfig[field] = newConfig[field];
  }

  const name = cmd.name ? cmd.name : 'default';

  if (config.getConfig(name)) {
    inquirer.prompt([{ type: 'boolean', name: 'overwrite', message: 'A config exists with the name ' + name + ' - do you want to overwrite it?' }])
      .then((answers) => {
        if (!answers.overwrite) {
          process.exit(0);
        }

        config.addFirebaseConfig(name, newConfig);
        console.log('\nSuccessfully initialized. Now login with the `login` command\n'.bold.green);
      });
  }

  config.addFirebaseConfig(name, newConfig);
  console.log('\nSuccessfully initialized. Now login with the `login` command\n'.bold.green);
}

export default init;
