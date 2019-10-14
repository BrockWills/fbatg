/* ------ Modules ------ */
import fs from 'fs';
import path from 'path';

/* ------ Utils for getting specific things out of config ------ */

function getAllFirebaseConfigs() {
  const config = require('../config/config.json');

  const firebaseConfigs = config.firebaseConfigs;
  if (!firebaseConfigs) {
    return [];
  }

  return firebaseConfigs.map((fbc) => fbc.name);
}

function getUser() {
  const config = require('../config/config.json');

  const user = config.user;
  if (!user || !user.email || !user.password) {
    return null;
  }

  return user;
}

function getActiveConfig() {
  const config = require('../config/config.json');

  const activeName = config.activeConfig;
  if (!activeName) {
    return null;
  }

  const firebaseConfigs = config.firebaseConfigs;
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

function getActiveConfigName() {
  const config = require('../config/config.json');

  const activeName = config.activeConfig;
  if (!activeName) {
    return null;
  }

  return activeName;
}

function getConfig(name) {
  const config = require('../config/config.json');

  const firebaseConfigs = config.firebaseConfigs;
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

function updateActiveConfig(name) {
  const config = require('../config/config.json');
  config.activeConfig = name;
  save(config);
}

function updateUser(email, password) {
  const config = require('../config/config.json');
  config.user = { email, password };
  save(config);
}

function addFirebaseConfig(name, firebaseConfig) {
  const config = require('../config/config.json');

  let firebaseConfigs = config.firebaseConfigs;
  if (!firebaseConfigs) {
    firebaseConfigs = [];
  }

  firebaseConfigs.push({ name, firebaseConfig });

  config.activeConfig = name;
  config.firebaseConfigs = firebaseConfigs;
  save(config);
}

function removeFirebaseConfig(name) {
  const config = require('../config/config.json');

  let firebaseConfigs = config.firebaseConfigs;
  if (!firebaseConfigs) {
    return;
  }

  config.firebaseConfigs = firebaseConfigs.filter((fbc) => fbc.name !== name);

  if (config.activeConfig === name) {
    config.activeConfig = null;
  }

  save(config);
}

/* ------ Util for saving a config file ------ */

function save(config) {
  fs.writeFileSync(path.join(path.dirname(module.parent.filename), '/../config/config.json'), JSON.stringify(config));
}

/* ------ Allllll the exports ------ */

export default {
  getAllFirebaseConfigs,
  getUser,
  getActiveConfig,
  getActiveConfigName,
  getConfig,
  updateActiveConfig,
  updateUser,
  addFirebaseConfig,
  removeFirebaseConfig,
};
