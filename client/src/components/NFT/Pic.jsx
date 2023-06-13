import React from "react";
import Overlay from "./Overlay";
import ArtPic from "./ArtPic";
import { MediaRenderer } from "@thirdweb-dev/react";

const Pic = (props) => {
    return (
        <div className="art">
            {/* <ArtPic 
                source={props.source}
                alt={props.alt}
             /> */}
             {/* <MediaRenderer src={props.metadata} /> */}
            <Overlay />
        </div>
    );
}

export default Pic;