/* ------ Modules ------ */
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

class JsonFile {
  constructor(path) {
    this.path = path;
    this.data = null;
  }

  load() {
    return new Promise(resolve => {
      fs.readFile(this.path, 'utf8', (err, jsonString) => {
        if (err) {
          this.data = null;
          return resolve();
        }

        try {
          this.data = JSON.parse(jsonString);
        } catch(e) {
          this.data = null;
        }

        return resolve();
      });
    });
  }

  save() {
    mkdirp.sync(path.dirname(this.path));
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

export default JsonFile;
