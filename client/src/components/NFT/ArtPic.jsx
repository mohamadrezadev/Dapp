import React from "react";

const ArtPic = (props) => {
    return (
        <img className="art-pic" src={props.source} alt={props.alt}></img>
    );
}

export default ArtPic;