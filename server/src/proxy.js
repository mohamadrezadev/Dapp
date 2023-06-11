const proxy = require("node-global-proxy").default;
const axios = require('axios');

proxy.setConfig({
  http: "http://localhost:1080",
//   https: "https://localhost:1080",
});
proxy.start();

function getnft(){
  
          const apiEndpoint = 'https://testnets-api.opensea.io/api/v1/assets'; // Use the testnet API endpoint
          const collectionSlug = 'Graduate certificate'; // Replace with your collection's slug
          const contractAddresses = '0x931f3dc9e91fb896ef82299218f1613a3ba281d5'; // Replace with your collection's contract addresses on the Ropsten network
        
          axios.get(apiEndpoint, {
            params: {
              asset_contract_addresses: contractAddresses,
              collection: collectionSlug,
              order_direction: 'desc',
              offset: '0',
              limit: '50',
            },
          })
          .then((response) => {
            const nfts = response.data.assets;
            console.log(nfts);
          })
          .catch((error) => {
            console.error("Erorr"+ error);
          });
        }
getnft()