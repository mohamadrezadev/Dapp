import React from "react";
import Pic from "./NFT/Pic";
import Text from "./NFT/Text";
import { MediaRenderer } from "@thirdweb-dev/react";
// import Profile from "./profile/Profile";

const Frame = (props)=> {
    return (
        <div>
                <div class="card shadow">
                          <div class="card-img mx-auto">
                            <MediaRenderer src={props.image} className="rounded-circle border" />
                            <div class="card-img-overlay mx-auto rounded-circle">
                              <img src="https://github.com/mwororokevin/nft-preview-card-component/blob/master/images/icon-view.svg?raw=true"/>
                            </div>
                          </div>   
                          <div class="card-title mt-3">
                            <h3 className="">
                              {props.name}
                            </h3>
                          </div>
                          <div className="card-details" dir="rtl">
                            <p style={{fontSize:"14px"}}>
                              {props.description}
                            </p>
                            <p className="text-end" style={{fontSize:"14px"}}>آدرس:</p>
                            <p className="mt-1" style={{fontSize:"12px"}}>{"{"} {props.address} {"}"}</p>
                            <a href={props.link}></a>
                           
                          </div>                
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