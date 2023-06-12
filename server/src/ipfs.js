const axios = require('axios');
const fs = require('fs');
// const pinataSDK = require('@pinata/sdk');c
// require('../ipfs/test.json')

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


const pinFileToIPFS = (data, pinataApiKey, pinataSecretApiKey, fileName) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const jsonData = JSON.stringify(data);
  const metadata = {
    name: fileName
  };
  const pinataOptions = {
    cidVersion: 0
  };
  const pinataContent = {
    pinataMetadata: metadata,
    pinataContent: jsonData,
    pinataOptions: pinataOptions
  };
  return axios.post(url, pinataContent, {
    headers: {
      'Content-Type': `application/json`,
      'pinata_api_key': pinataApiKey,
      'pinata_secret_api_key': pinataSecretApiKey
    }
  }).then(function (response) {
    console.log(response.data.IpfsHash);
  }).catch(function (error) {
    console.log(error);
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


function generate_metadata(firstname,lastname,degree,major,year) {
  return{
    "name": "Graduate certificate",
    "description": `Dear student ${firstname} ${lastname}, we congratulate you on your graduation from Bozormehr Qaenat University in the ${degree} (${major}) of study in ${year}.`,
    "image": "ipfs://QmTmh7ffdVZKJgMjEMWpy9H4iyW9kSbKA7oHKKSrLiTQdp",
    "attributes": [
      {
        "trait_type": `${firstname}`,
        "value": `${lastname}`
      },
      {
        "trait_type": "field",
        "value": `${degree}`
      },
      {
        "trait_type": "Date",
        "value": `${year}`
      },
      {
        "trait_type": "Details",
        "value": `This student has graduated from Bozormehr Qaenat University this ${year} `
      }
    ]
  }
}



function getnft1() {
  const contractAddresses = '0x931f3dc9e91fb896ef82299218f1613a3ba281d5'; // Replace with your collection's contract addresses on the Ropsten network
  const collectionSlug = 'art'; // Replace with your collection's slug

  const axiosConfig = {
    method: 'GET',
    url: 'https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings',
    headers: {
      accept: 'application/json'
    },
    params: {
      asset_contract_addresses: contractAddresses,
      collection: collectionSlug,
      order_direction: 'desc',
      offset: '0',
      limit: '50'
      
    }
  };
  
  axios(axiosConfig)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  
}

function getnft(){
  
  const apiEndpoint = 'https://testnets-api.opensea.io/api/v1/assets'; // Use the testnet API endpoint
  const collectionSlug = 'art'; // Replace with your collection's slug
  const contractAddresses = '0x931f3dc9e91fb896ef82299218f1613a3ba281d5'; // Replace with your collection's contract addresses on the Ropsten network
  const axiosConfig = {
  
    params: {
      asset_contract_addresses: contractAddresses,
      collection: collectionSlug,
      order_direction: 'desc',
      offset: '0',
      limit: '50'
    }
  }
  axios.get(apiEndpoint,axiosConfig).then((response) => {
    const nfts = response.data.assets;
    console.log(nfts);
  })
  .catch((error) => {
    console.error("Erorr"+ error);
  });
}
getnft1()
// let metadata= generate_metadata("ali","kiani","computer","senior",2023)
// pinFileToIPFS(metadata,pinata_api_key1,pinata_secret_api_key1,'test')

exports={write,pinFileToIPFS,generate_metadata};

