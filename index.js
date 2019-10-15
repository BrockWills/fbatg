/* ------ Modules ------ */
import program from 'commander';

/* ------ Helpers ------ */
import config from './helpers/config';

/* ------ Version ------ */
import { version } from './package.json';

/* ------ Commands ------ */
import {
  configList,
  configRemove,
  configSwitch,
  init,
  login,
  token,
} from './commands';

program.version(version);

/* ------ Setup the commands ------ */
program.command('init <config>')
  .option('--config-name <name>', 'Allows you to set the name that the config is stored as')
  .description('Initializes the tool with your firebase config details')
  .action(init);

program.command('config-switch <name>')
  .description('Allows you to switch firebase configs')
  .action(configSwitch);

program.command('config-list')
  .description('Lists all current firebase configs')
  .action(configList);

program.command('config-remove <name>')
  .description('Removes the given named config')
  .action(configRemove);

program.command('login')
  .description('Login to firebase so that you can generate auth tokens')
  .action(login);

program.command('token')
  .description('Get a firebase auth token for the currently signed in user')
  .action(token);

(async function() {
  /* ------ Initialize our config handler ------ */
  await config.init();

  /* ------ This is basically where execution starts ------ */
  program.parse(process.argv);

  /* ------ Default to the `token` command ------ */
  if (!program.args.length) {
    token();
  }
})();
