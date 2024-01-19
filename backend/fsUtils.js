const fs = require("fs");

const readFilePromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};

const writeFilePromise = (filePath, jsonObj) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(jsonObj, null, 2), (err) => {
      if (err) reject(err);
      else resolve(jsonObj);
    });
  });
};

module.exports = {
  readFilePromise,
  writeFilePromise,
};
