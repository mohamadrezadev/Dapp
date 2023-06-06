const axios = require('axios');
const fs = require('fs');
// const pinataSDK = require('@pinata/sdk');c
require('../ipfs/test.json')

function write(obj) {
  try {
    const json = JSON.stringify(obj);
    fs.writeFileSync('./contrcatAddress.json', json, 'utf8');
    console.log('File has been saved');
  } catch (err) {
    console.error(err);
  }
}
const pinata_api_key1='14169286a8db5599abdf';
const pinata_secret_api_key1='3a6d1543584863f74f0efe1f26acd29ece2c5cbee1459da8a4ce57eb907cf5cc';





pinFileToIPFS = (data, pinataApiKey, pinataSecretApiKey) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const jsonData = JSON.stringify(data);
  console.log(jsonData)
  return axios.post(url,
    jsonData,
      {
          headers: {
              'Content-Type': `application/json`,
              'pinata_api_key': pinataApiKey,
              'pinata_secret_api_key': pinataSecretApiKey
          }
      }
  ).then(function (response) {
    console.log(response.data)
      //handle response here
  }).catch(function (error) {
    console.log(error)
      //handle error here
  });
};

testAuthentication = () => {
    const url = `https://api.pinata.cloud/data/testAuthentication`;
    return axios
        .get(url, {
            headers: {
                'pinata_api_key': "01b8a3152fa2cfd7c23b",
                'pinata_secret_api_key': "be9f4e67d743194f11123b707f7a0ef73cdb3e3566afa2c6e58b2cb2ee01ed86"
            }
        })
        .then(function (response) {
            
            //handle your response here
        })
        .catch(function (error) {
           
            //handle error here
        });
};

const data = {
  "name": "Graduate certificate",
  "description": "Dear student.......we congratulate you on your graduation from Bozormehr Qaenat University in the field of study.",
  "image": "ipfs://QmTmh7ffdVZKJgMjEMWpy9H4iyW9kSbKA7oHKKSrLiTQdp",
  "attributes": [
    {
      "trait_type": "Mohamadreza",
      "value": "Kiani"
    },
    {
      "trait_type": "field",
      "value": "Computer"
    },
    {
      "trait_type": "Date",
      "value": "2023-06-02"
    },
    {
      "trait_type": "Details",
      "value": "This student has graduated from Bozormehr Qaenat University this year"
    }
  ]
}

const options = {
  pinataMetadata: {
    name: 'Certificate Univercity'
  }
};


pinFileToIPFS(data,pinata_api_key1,pinata_secret_api_key1)

exports={write};

