import 'axios'
import axios from 'axios';

export const pinata_api_key1='14169286a8db5599abdf';
export const pinata_secret_api_key1='3a6d1543584863f74f0efe1f26acd29ece2c5cbee1459da8a4ce57eb907cf5cc';

export const pinFileToIPFS2 =async (data, pinataApiKey, pinataSecretApiKey) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const jsonData = JSON.stringify(data);
  return await axios.post(url,
    jsonData,
      {
          headers: {
              'Content-Type': `application/json`,
              'pinata_api_key': pinataApiKey,
              'pinata_secret_api_key': pinataSecretApiKey
          }
      }
  )
};


export const  pinFileToIPFS = (data, pinataApiKey, pinataSecretApiKey, fileName) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const jsonData = JSON.stringify(data);
  const metadata = {
    name: fileName
  };
  const pinataOptions = {
    cidVersion: 0
  };
  const Content = {
    pinataMetadata: metadata,
    pinataContent: data,
    pinataOptions: pinataOptions
  };
  // console.log()
  console.log(Content)
  return axios.post(url,Content, {
    headers: {
      'Content-Type': `application/json`,
      'pinata_api_key': pinataApiKey,
      'pinata_secret_api_key': pinataSecretApiKey
    }
  })
};
export const get = (ipfsPinHash) => {
  return axios.get(`https://api.pinata.cloud/pinning/pinByHash/${ipfsPinHash}`, {
    headers: {
        'pinata_api_key': pinata_api_key1,
        'pinata_secret_api_key': pinata_secret_api_key1
    }
  })
  .then(response => {
    const metadata = response.data.metadata;
    const url = metadata.ipfsDownloadUrl;
    return axios.get(url)
      .then(response => {
        const data = response.data;
        return data;
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
}
export const testAuthentication = () => {
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


export function generate_metadata(firstname,lastname,degree,major,year) {
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
// let metadata= generate_metadata("mohamadreza","kiani","computer","senior",2023)
// pinFileToIPFS(metadata,pinata_api_key1,pinata_secret_api_key1)

// exports={write,pinFileToIPFS,generate_metadata};

