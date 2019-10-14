/* ------ Modules ------ */
import firebase from 'firebase';

/* ------ Helpers ------ */
import config from './config';

/* ------ Handles all the interaction with Firebase ------ */
class Firebase {
  /**
   * Initializes firebase auth based on the currently active config
   */
  constructor() {
    const firebaseConfig = config.getActiveConfig();
    if (!firebaseConfig) {
      process.exit(1);
    }

    const firebaseApp = firebase.initializeApp(firebaseConfig);

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

export default Firebase;
