import React from "react";
import Pic from "./NFT/Pic";
import Text from "./NFT/Text";
import { MediaRenderer } from "@thirdweb-dev/react";
// import Profile from "./profile/Profile";

const Frame = (props)=> {
    return (
        <div>
                <div class="card">
                          <div class="card-img">
                            <MediaRenderer src={props.image} />
                            <div class="card-img-overlay">
                              <img src="https://github.com/mwororokevin/nft-preview-card-component/blob/master/images/icon-view.svg?raw=true"/>
                            </div>
                          </div>   
                          <div class="card-title">
                            <h3>
                              {props.name}
                            </h3>
                          </div>
                          <div className="card-details" dir="rtl">
                            <p >
                              {props.description}
                            </p>
                            <span>ادرس</span>
                            <p>{props.address}</p>
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