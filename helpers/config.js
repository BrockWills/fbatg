/* ------ Modules ------ */
import os from 'os';

/* ------ Helpers ------ */
import JsonFile from './json-file';

const DEFAULT_CONFIG = {
  activeConfig: null,
  user: null,
  firebaseConfigs: [],
};

class Config {
  constructor() {
    this.file = null;
  }

  async init() {
    this.file = new JsonFile(os.homedir() + '/.fbatg/fbatg.json');
    await this.file.load();

    if (!this.file.data) {
      this.file.data = DEFAULT_CONFIG;
      this.file.save();
    }
  }

  /* ------ Utils for getting specific things out of config ------ */

  getAllFirebaseConfigs() {
    const firebaseConfigs = this.file.data.firebaseConfigs;
    if (!firebaseConfigs) {
      return [];
    }

    return firebaseConfigs.map((fbc) => fbc.name);
  }

  getUser() {
    const user = this.file.data.user;
    if (!user || !user.email || !user.password) {
      return null;
    }

    return user;
  }

  getActiveConfig() {
    const activeName = this.file.data.activeConfig;
    if (!activeName) {
      return null;
    }

    const firebaseConfigs = this.file.data.firebaseConfigs;
    if (!firebaseConfigs) {
      return null;
    }

    let firebaseConfig = null;
    firebaseConfigs.forEach((fbc) => {
      if (fbc.name === activeName) {
        firebaseConfig = fbc.firebaseConfig;
      }
    });

    return firebaseConfig;
  }

  getActiveConfigName() {
    const activeName = this.file.data.activeConfig;
    if (!activeName) {
      return null;
    }

    return activeName;
  }

  getConfig(name) {
    const firebaseConfigs = this.file.data.firebaseConfigs;
    if (!firebaseConfigs) {
      return null;
    }

    let firebaseConfig = null;
    firebaseConfigs.forEach((fbc) => {
      if (fbc.name === name) {
        firebaseConfig = fbc.firebaseConfig;
      }
    });

    return firebaseConfig;
  }

  /* ------ Utils for updating the config file ------ */

  updateActiveConfig(name) {
    this.file.data.activeConfig = name;
    this.file.save();
  }

  updateUser(email, password) {
    this.file.data.user = { email, password };
    this.file.save();
  }

  addFirebaseConfig(name, firebaseConfig) {
    let firebaseConfigs = this.file.data.firebaseConfigs;
    if (!firebaseConfigs) {
      firebaseConfigs = [];
    }

    // Check for existing config
    let overwritten = false;
    firebaseConfigs = firebaseConfigs.map(conf => {
      if (conf.name === name) {
        conf.firebaseConfig = firebaseConfig;
        overwritten = true;
      }

      return conf;
    });

    if (!overwritten) {
      firebaseConfigs.push({ name, firebaseConfig });
    }

    this.file.data.activeConfig = name;
    this.file.data.firebaseConfigs = firebaseConfigs;
    this.file.save();
  }

  removeFirebaseConfig(name) {
    let firebaseConfigs = this.file.data.firebaseConfigs;
    if (!firebaseConfigs) {
      return;
    }

    this.file.data.firebaseConfigs = firebaseConfigs.filter((fbc) => fbc.name !== name);

    if (this.file.data.activeConfig === name) {
      this.file.data.activeConfig = null;
    }

    this.file.save();
  }
}

export default new Config();
