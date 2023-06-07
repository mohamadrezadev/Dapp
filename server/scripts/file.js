const fs = require('fs');
const pinataSDK = require('@pinata/sdk');

function write(obj) {
  try {
    const json = JSON.stringify(obj);
    fs.writeFileSync('./contrcatAddress.json', json, 'utf8');
    console.log('File has been saved');
  } catch (err) {
    console.error(err);
  }
}

module.exports.write=write;


