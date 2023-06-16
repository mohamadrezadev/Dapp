import React from "react";
import Heading from "./Heading";
import Info from "./Info";
import Bet from "./Bet";

function Text(props) {
    return (
        <div className="text">
            <Heading content={props.name} />
            <Info content={props.description} />
            {/* <Bet /> */}
        </div>
    );
}

export default Text;