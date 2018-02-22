const fs = require('fs');
const path = require('path');

/**
 * `init`
 *
 * This command initialises the CLI from a JSON file that contains all the necessary firebases details
 */
const init = function(configPath) {
  if (!fs.existsSync(configPath)) {
    console.log(('\nFile `' + configPath + '` does not exist\n').bold.red);
    return;
  }

  const configString = fs.readFileSync(configPath, 'utf8');
  let config;

  try {
    config = JSON.parse(configString);
  } catch(e) {
    console.log('\nConfig file must be valid json\n'.bold.red);
    return;
  }

  const fields = ['apiKey', 'authDomain', 'databaseURL', 'projectId', 'storageBucket', 'messagingSenderId'];

  const resultingConfig = {};
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    if (!config[field]) {
      console.log(('\n' + field + ' is required in your config file\n').bold.red);
      return;
    }

    resultingConfig[field] = config[field];
  }

  fs.writeFileSync(path.resolve('config/config.json'), JSON.stringify(resultingConfig));

  console.log('\nSuccessfully initialized. Now try to get a token with the `token` command\n'.bold.green);
};

module.exports = init;
