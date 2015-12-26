const fs = require('fs');

module.exports = function existsCheck(path, callback) {
  try {
    fs.accessSync(path);
    console.log('that thing exists', path);
    if (!callback) {
        return true
    } else {
        callback(true)
    }

  } catch (error) {
    console.log('not so much', path);
    console.log(error);
    console.log(callback);
    if (!callback) {
        return false
    } else {
        callback(false)
    }
  }
};
