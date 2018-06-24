const Firebase = require('../firebase/auth.js');
const colors = require('colors');

/**
 * `token`
 *
 * This command actually generates the auth token, assuming the CLI has already been init'ed,
 * and you are already logged in (from the `fbatg login` command).
 */
const token = function() {
  try {
    require('../config/config.json');
  } catch(e) {
    console.log('\nYou need to initialize with `fbatg init` first\n'.bold.red);
    return;
  }

  let user;

  try {
    user = require('../config/user.json');
  } catch (e) {
    console.log('\nYou need to login with `fbatg login` first\n'.bold.red);
    return;
  }

  if (!user.email || !user.password) {
    console.log('\nYou need to login again with `fbatg login`\n'.bold.red);
    return;
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

module.exports = token;
