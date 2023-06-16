import React, { useState, useEffect } from 'react';
import axios from 'axios';
import contrcatAddress from '../../../server/contrcatAddress.json'
import "../assets/css/nftcard.css"
import './Frame'
import Frame from './Frame';
export const NFTs = () => {
  
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    // Contract address
    const address = contrcatAddress.NFTContract
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
        
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
   
    <div>
      <div className="container">
          <div className="row">
              {nfts.map((nft, index) => (
                <div className="col-sm-4 " key={index}>
                    <Frame
                          name={nft.metadata.name}
                          description={nft.metadata.description}
                          image={nft.metadata.image}   
                      />
                  </div>
                  ))
                }
          </div>
      </div>
     
    </div>
  );
};

export const Nftlast=()=>
{
  const [lastnft, setlastnft] = useState([]);

  useEffect(() => {
    // Contract address
    const address = contrcatAddress.NFTContract
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
        console.log(nfts[0]);
        const lastThree = nfts.slice(-3);
        setlastnft(lastThree);
        
      })
      .catch(error => console.log('error', error));
  }, []);
  return (
   
    <div>
      <div className="container">
          <div className="row">
              {lastnft.map((nft, index) => (
                <div className="col-sm-4 " key={index}>
                    <Frame
                          name={nft.metadata.name}
                          description={nft.metadata.description}
                          image={nft.metadata.image} 
                          address={nft.contract.address} 
                          
                      />
                  </div>
                  ))
                }
          </div>
      </div>
     
    </div>
  );

}


