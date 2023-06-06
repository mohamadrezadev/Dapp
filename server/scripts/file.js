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
function uploda(){
  
  const pinata = pinataSDK('01b8a3152fa2cfd7c23b', 'be9f4e67d743194f11123b707f7a0ef73cdb3e3566afa2c6e58b2cb2ee01ed86');

  const readableStreamForFile = fs.createReadStream('certificate.json');

  const options = {
    pinataMetadata: {
      name: 'Certificate Univercity',
      keyvalues: {
        customKey: 'customValue'
      }
    },
    pinataOptions: {
      cidVersion: 0,
      wrapWithDirectory: true
    }
  };

  pinata.pinFileToIPFS(readableStreamForFile, options)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
exports={write,writeDataToFile};

