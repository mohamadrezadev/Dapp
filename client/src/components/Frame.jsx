import React from "react";
import Pic from "./NFT/Pic";
import Text from "./NFT/Text";
import { MediaRenderer } from "@thirdweb-dev/react";
// import Profile from "./profile/Profile";

const Frame = (props)=> {
    return (
        <div className="frame">
         
            <MediaRenderer src={props.image} />
            <Text
                name={props.name}
                description={props.description}
            />
         
        </div>
    );
}

export default Frame;