import axios from 'axios';
export const getnfts=async (contractAddresses,collectionSlug)=> {
  const contractAddresses1 = '0x931f3dc9e91fb896ef82299218f1613a3ba281d5'; // Replace with your collection's contract addresses on the Ropsten network
  const collectionSlug1 = 'Graduate certificate'; // Replace with your collection's slug
//   const options = {method: 'GET', headers: {accept: 'application/json'}};
  const options = {headers: {accept: 'application/json'}};
  axios.get('https://testnets-api.opensea.io/api/v1/assets/', {
          params: {
            asset_contract_address: '0x3bf9426351bc393ee6fa617b7838bb87927e918b',
            collection: 'Art'
          },
          // ...options
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
//   const axiosConfig = {
//     method: 'GET',
// //     https://testnets-api.opensea.io/v2/listings/collection/Certificate-of-Bozorgmehr-Qaenat-University/all
//     url: 'https://testnets-api.opensea.io/v2/orders/mumbai/seaport/listings',
//     headers: {
//           'Accept': 'application/json'
//     },
//     params: {
//       asset_contract_addresses: contractAddresses,
//       collection: collectionSlug,
//       order_direction: 'desc',
//       offset: '0',
//       limit: '50'
      
//     }
//   };
//   const response = await axios(axiosConfig).then(response=>{
//           console.log(response)
//   }).catch(errors=>{
//           console.log(errors)
//   });
  return response;
  
  
}