/* ------ Module imports ------ */
import program from 'commander';

/* ------ Helpers ------ */
import config from '../../helpers/config';
import colors from 'colors';

/* ------ Commands ------ */
import activate from './activate';
import list from './list';
import remove from './remove';

program.command('list')
  .description('List all firebase configs')
  .action(list);

program.command('activate <name>')
  .description('Switch your currently activate firebase config')
  .action(activate);

program.command('remove <name>')
  .description('Remove a firebase config')
  .action(remove);

(async function() {
  /* ------ Initialize our config handler ------ */
  await config.init();

  /* ------ This is basically where execution starts ------ */
  program.parse(process.argv);
})();
