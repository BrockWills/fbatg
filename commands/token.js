const inquirer = require('inquirer');
const Firebase = require('../firebase/auth.js');
const emailValidator = require('email-validator');
const colors = require('colors');

/* ------ These are the questions the login prompt asks ------ */
const questions = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email',
    validate: (email) => {
      return emailValidator.validate(email);
    },
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter your password: ',
    validate: (password) => {
      if (!password) {
        return false;
      }

      return true;
    },
  },
];

/**
 * `token`
 *
 * This command actually generates the auth token, assuming the CLI has already been init'ed.
 * Requires you to log into a firebase account using an email and password.
 */
const token = function() {
  try {
    require('../config/config.json');
  } catch(e) {
    console.log('\nYou need to initialize with `fbatg init` first\n'.bold.red);
    return;
  }

  inquirer.prompt(questions)
    .then((answers) => {
      const email = answers.email;
      const password = answers.password;

      return new Firebase().login(email, password);
    })
    .then((token) => {
      console.log('\n------ START FIREBASE AUTH TOKEN ------'.bold);
      console.log(token);
      console.log('------ END ------\n'.bold);

      process.exit(0);
    })
    .catch(() => {
      console.log('\nInvalid email/password combo\n'.red.bold);

      process.exit(1);
    });
};

module.exports = token;
