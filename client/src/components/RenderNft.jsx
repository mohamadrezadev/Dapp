import React, { useState, useEffect } from 'react';
import axios from 'axios';
import contrcatAddress from '../../../server/contrcatAddress.json'
import "../assets/css/nftcard.css"
import './Frame'
import Frame from './Frame';

export const NftPreview = ({ nftId, contractAddress }) => {
  const handlePreviewClick = () => {
  
    const assetUrl = `https://testnets.opensea.io/assets/mumbai/${contractAddress}/${nftId}`;
    const queryParams = "?force_update=true&useBetaLayout=true";
    window.open(assetUrl, "_blank");
  };

  return (
    <div>
      <button className="btn btn-dark  mt-2 align-items-center   " onClick={handlePreviewClick}>{"نمایش اطلاعات "}</button>
    </div>
  );
};


// In your component, render a clickable element for each NFT:

// export const NFTs = () => {
  
//   const [nfts, setNfts] = useState([]);
  
//   useEffect(() => {
   
//     const address = contrcatAddress.NFTContract
//     const withMetadata = 'true';
//     const apiKey = 'ZinXrRb-UnKcg0y955wyVF-c1FKtcixo';
//     const baseURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection`;
//     const url = `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}`;
//     const config = {
//         method: 'get',
//         url: url,
//     };

    
//     axios(config)
//       .then(response => {
//         const nfts = response.data.nfts.map(nft => {
         
//           const tokenId = parseInt(nft.id.tokenId, 16);
//           const assetURL = `https://testnets.opensea.io/assets/${contrcatAddress.NFTContract}/${tokenId}`;
//           return { ...nft, assetURL: assetURL };
//         });
//         console.log(nfts)
//         setNfts(nfts);
//       })
//       .catch(error => console.log('error', error));
//   }, []);

//   return (
   
//     <div>
//       <div className="container">
        
//           <div className="row">
//           {nfts && nfts.length > 0 ? (
//             nfts.map((nft, index) => (
//               <div className="col-sm-4" key={index}>
//                 <Frame
//                   name={nft.metadata.name}
//                   description={nft.metadata.description}
//                   image={nft.metadata.image}
//                   address={nft.contract.address}
//                   symbol={nft.contractMetadata.symbol}
//                   contractAddress={nft.contract.address}
//                   tokenId={parseInt(nft.id.tokenId,16)}
//                 />
//               </div>
//             ))
//           ) : (
//             <div class="alert alert-dark" role="alert">
//               در حال حاضر هیچ مدرکی صادر نشده است 
//             </div>
         
//           )}
//       </div>
//      </div>
//     </div>
//   );
// };
export const NFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const address = contrcatAddress.NFTContract;
    const withMetadata = "true";
    const apiKey = "ZinXrRb-UnKcg0y955wyVF-c1FKtcixo";
    const baseURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection`;
    const url = `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}`;
    const config = {
      method: "get",
      url: url,
    };

    axios(config)
      .then((response) => {
        const nfts = response.data.nfts.map((nft) => {
          const tokenId = parseInt(nft.id.tokenId, 16);
          const assetURL = `https://testnets.opensea.io/assets/${contrcatAddress.NFTContract}/${tokenId}`;
          return { ...nft, assetURL: assetURL };
        });
        console.log(nfts);
        setNfts(nfts);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? (
            <div>{"درحال بارگذاری ....."}</div>
          ) : nfts && nfts.length > 0 ? (
            nfts.map((nft, index) => (
              <div className="col-sm-4" key={index}>
                <Frame
                  name={nft.metadata.name}
                  description={nft.metadata.description}
                  image={nft.metadata.image}
                  address={nft.contract.address}
                  symbol={nft.contractMetadata.symbol}
                  contractAddress={nft.contract.address}
                  tokenId={parseInt(nft.id.tokenId, 16)}
                />
              </div>
            ))
          ) : (
            <div class="alert alert-dark" role="alert">
              در حال حاضر هیچ مدرکی صادر نشده است
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export const Nftlast = () => {
  const [lastnft, setlastnft] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const address = contrcatAddress.NFTContract;
    const withMetadata = "true";
    const apiKey = "ZinXrRb-UnKcg0y955wyVF-c1FKtcixo";
    const baseURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection`;
    const url = `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}`;
    const config = {
      method: "get",
      url: url,
    };

    axios(config)
      .then((response) => {
        const nfts = response.data.nfts;
        console.log(nfts[0]);
        const lastThree = nfts.slice(-3);
        setlastnft(lastThree);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <div className="container">
        {loading ? (
          <div>در حال بارگذاری...</div>
        ) : (
          <div className="row">
            {lastnft.map((nft, index) => (
              <div className="col-sm-4 " key={index}>
                <Frame
                  name={nft.metadata.name}
                  description={nft.metadata.description}
                  image={nft.metadata.image}
                  address={nft.contract.address}
                  symbol={nft.contractMetadata.symbol}
                  contractAddress={nft.contract.address}
                  tokenId={parseInt(nft.id.tokenId, 16)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
