import React from "react";

const HeaderSection = ({text} : {text : string}) => {
    return <p className="text-4xl font-bold mb-6 mt-1">
        {text}
    </p>;
};

export default HeaderSection;
