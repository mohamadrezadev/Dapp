import React from "react";

const Heading = (props) => {
    return (
        <h3 className="heading">
            {props.content}
        </h3>
    );
}

export default Heading;