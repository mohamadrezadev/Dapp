
import axios from 'axios';
import contrcatAddress from '../../../server/contrcatAddress.json'
export const RENDERNFT=function (){
          
  // Contract address
  const address = contrcatAddress.NFTContract;
  console.log(address);

// Metadata inclusion flag
const withMetadata = 'true';

// Alchemy API key
const apiKey = 'ZinXrRb-UnKcg0y955wyVF-c1FKtcixo';
 
// Alchemy URL
const baseURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection`;
const url = `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}`;

const config = {
    method: 'get',
    url: url,
};
// Make the request and print the formatted response:
axios(config)
    .then(response => {
        const nfts = response['data']['nfts']

        console.log("NFT Metadata")
        let i = 1
        for (let nft of nfts) {
            console.log('nfts'+ `${i}. ${nft['metadata']['image']}`)
            i++;
        }
    })
    .catch(error => console.log('error', error));
// Make the request and print the formatted response:
// axios(config)
//     .then(response => console.log(JSON.stringify(response['data'], null, 2)))
//     .catch(error => console.log(error));

}