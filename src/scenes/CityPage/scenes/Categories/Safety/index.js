import "./styles.css";

import React from "react";
import Graph from "./components/Graph";

const Safety = ({ secondCity }) => {
    if(secondCity) {
        return (
            <div>
            <h1>Safety</h1>
            <Graph secondCity/>
            </div>
        );  
    }

    return (
        <div>
        <h1>Safety</h1>
        <Graph />
        </div>
    );  
};
 
export default Safety;
