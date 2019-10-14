/* ------ Modules ------ */
import inquirer from 'inquirer';
import emailValidator from 'email-validator';
import colors from 'colors';
import fs from 'fs';
import path from 'path';

/* ------ Helpers ------ */
import Firebase from '../helpers/firebase';
import config from '../helpers/config';

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
 * This command will sign you into firebase, assuming the CLI has already been init'ed.
 * Requires you to log into a firebase account using an email and password.
 */
function login() {
  if (!config.getActiveConfig()) {
    console.log('\nYou need to initialize with `fbatg init` first\n'.bold.red);
    process.exit(1);
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

      config.updateUser(email, password);
      process.exit(0);
    })
    .catch((e) => {
      console.log('\nInvalid email/password combo\n'.red.bold);

      process.exit(1);
    });
}

export default login;
