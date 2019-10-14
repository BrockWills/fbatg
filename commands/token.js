/* ------ Modules ------ */
import colors from 'colors';
import fs from 'fs';

/* ------ Helpers ------ */
import Firebase from '../helpers/firebase';
import config from '../helpers/config';

/**
 * This command actually generates the auth token, assuming the CLI has already been init'ed,
 * and you are already logged in (from the `fbatg login` command).
 */
function token() {
  if (!config.getActiveConfig()) {
    console.log('\nYou need to initialize with `fbatg init` first\n'.bold.red);
    process.exit(1);
  }

  const user = config.getUser();

  if (!user) {
    console.log('\nYou need to login with `fbatg login` first\n'.bold.red);
    process.exit(1);
  }

  new Firebase().login(user.email, user.password)
    .then((token) => {
      console.log('\n------ START FIREBASE AUTH TOKEN ------'.bold);
      console.log(token);
      console.log('------ END ------\n'.bold);

      process.exit(0);
    })
    .catch(() => {
      console.log('\nYou need to login again with `fbatg login`\n'.bold.red);

      process.exit(1);
    });
};

export default token;
