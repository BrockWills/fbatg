const firebase = require('firebase');

/* ------ Handles all the interaction with Firebase ------ */
class Firebase {
  /**
   * Initializes firebase auth based on the config file.
   *
   * Currently assumes ../config/config.json already exists, because that check
   * occurs in the token command handler, but should probably be handled here instead.
   * I'll fix it one day, maybe :P
   */
  constructor() {
    const config = require('../config/config.json');

    const firebaseApp = firebase.initializeApp(config);

    this.auth = firebaseApp.auth();
  }

  /**
   * Try's to login with the provided details, and fetch an auth token.
   *
   * There's no .catch here because promise rejects (ie. errors) are caught up in token instead.
   */
  login(email, pw) {
    return this.auth.signInWithEmailAndPassword(email, pw)
      .then((res) => this.auth.currentUser.getIdToken(false));
  }
}

module.exports = Firebase;
