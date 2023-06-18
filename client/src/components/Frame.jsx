import React from "react";

import { MediaRenderer } from "@thirdweb-dev/react";
import { NftPreview } from "./RenderNft";


const Frame = (props)=> {
    return (
        <div>
                <div className="card mb-4 shadow">
                          <div className="card-img mx-auto">
                            <MediaRenderer src={props.image} className="rounded-circle border" />
                            <div className="card-img-overlay mx-auto rounded-circle">
                              <img src="https://github.com/mwororokevin/nft-preview-card-component/blob/master/images/icon-view.svg?raw=true"/>
                            </div>
                          </div>   
                          <section>
                          <div className="card-title mt-3">
                            <h3 className="">
                              { ` ${props.name}`}
                              {/* (${props.symbol}) */}
                            </h3>
                          </div>
                          <div className="card-details" dir="rtl">
                            <p style={{fontSize:"14px"}}>
                              {props.description}
                            </p>
                            <p className="mt-4">
                              <NftPreview contractAddress={props.contractAddress }nftId={props.tokenId}/>
                            </p>
                          </div>
                          </section>
                          
                          <section>
                          <div className="container mb-6">
                            {/* <a className="card-link"> 
                              <NftPreview contractAddress={props.contractAddress}
                              nftId={props.tokenId}/>
                            </a> */}

                          </div>
                          </section>
                </div>

        </div>
            // <div className="frame shadow">
            //     <MediaRenderer src={props.image} />
            //     <Text
            //         name={props.name}
            //         description={props.description}
            //     />
            //     <div className="">{`${props.address}آدرس قرارداد `} </div>
            // </div>
    );
}

export default Frame;