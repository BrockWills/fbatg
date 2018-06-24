const inquirer = require('inquirer');
const Firebase = require('../firebase/auth.js');
const emailValidator = require('email-validator');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

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
 * `login`
 *
 * This command will sign you into firebase, assuming the CLI has already been init'ed.
 * Requires you to log into a firebase account using an email and password.
 */
const login = function() {
  try {
    require('../config/config.json');
  } catch(e) {
    console.log('\nYou need to initialize with `fbatg init` first\n'.bold.red);
    return;
  }

  let email, password;

  inquirer.prompt(questions)
    .then((answers) => {
      email = answers.email;
      password = answers.password;

      return new Firebase().login(email, password);
    })
    .then((token) => {
      console.log('\nSuccessfully logged in. Now try getting a token with the `token` command.\n'.bold.green);

      const userDetails = { email, password };

      // Save the email and password
      fs.writeFileSync(path.join(path.dirname(module.parent.filename), 'config/user.json'), JSON.stringify(userDetails));

      process.exit(0);
    })
    .catch((e) => {
      console.log('\nInvalid email/password combo\n'.red.bold);

      process.exit(1);
    });
};

module.exports = login;
