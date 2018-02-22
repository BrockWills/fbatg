#!/usr/bin/env node

const program = require('commander');

program.version('0.1.2');

/* ------ Setup the `init` command ------ */
program.command('init <config>')
  .description('Initializes the tool with your firebase config details')
  .action(require('./commands/init.js'));

/* ------ Setup the `token` command ------ */
program.command('token')
  .description('Get a firebase auth token by email')
  .action(require('./commands/token.js'));

/* ------ This is basically where execution starts ------ */
program.parse(process.argv);

/* ------ Default to the `token` command ------ */
if (!program.args.length) {
  require('./commands/token.js')();
}
