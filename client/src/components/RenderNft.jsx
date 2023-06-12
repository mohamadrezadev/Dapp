import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { ThirdwebNftMedia } from "@thirdweb-dev/react";

import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import contrcatAddress from '../../../server/contrcatAddress.json'
export const NFTs = () => {
  
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    // Contract address
    const address = '0x931f3dc9e91fb896ef82299218f1613a3ba281d5'
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

    // Make the request and update state with NFT data:
    axios(config)
      .then(response => {
        const nfts = response.data.nfts;
        setNfts(nfts);
        console.log(nfts.metadata)
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
   
    <div>
      <h1>NFT Metadata</h1>
      <ul>
        {nfts.map((nft, index) => (
          
          <li key={index}>
             <ThirdwebNftMedia
                  metadata={nft.metadata}
                  controls={true}
                  height={200}
             />
            <h2>{`nft ${index + 1}: ${nft.metadata.name}`}</h2>
            <p>{nft.metadata.description}</p>
          </li>
        ))
        }
      </ul>
    </div>
  );
};
export const Testnft= function () {
  const { contract } = useContract(
    contrcatAddress.NFTContract
  );
  const { data: nft, isLoading, error } = useNFT(contract, "0");

  if (isLoading) return <div>Loading...</div>;
  if (error || !nft) return <div>NFT not found</div>;

  return <ThirdwebNftMedia metadata={nft.metadata} />;
}
