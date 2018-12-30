#!/usr/bin/env node

const program = require('commander');

program.version('0.1.2');

/* ------ Setup the `init` command ------ */
program.command('init <config>')
  .option('--name <name>', 'Allows you to set the name that the config is stored as')
  .description('Initializes the tool with your firebase config details')
  .action(require('./commands/init.js'));

program.command('config-switch <name>')
  .description('Allows you to switch firebase configs')
  .action(require('./commands/config-switch.js'));

program.command('config-list')
  .description('Lists all current firebase configs')
  .action(require('./commands/config-list.js'));

program.command('config-remove <name>')
  .description('Removes the given named config')
  .action(require('./commands/config-remove.js'));

program.command('login')
  .description('Login to firebase so that you can generate auth tokens')
  .action(require('./commands/login.js'));

/* ------ Setup the `token` command ------ */
program.command('token')
  .description('Get a firebase auth token for the currently signed in user')
  .action(require('./commands/token.js'));

/* ------ This is basically where execution starts ------ */
program.parse(process.argv);

/* ------ Default to the `token` command ------ */
if (!program.args.length) {
  require('./commands/token.js')();
}
