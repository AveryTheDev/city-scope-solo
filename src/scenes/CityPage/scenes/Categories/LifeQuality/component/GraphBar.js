import '../styles.css'

import React from 'react';

const GraphBar = ({name, color, score}) => {
    return (
      <div className="city-scores">
        <div className="scoreData">
          <p className="category">{name}</p>
          <div className="categoryContainer">
            <div className="categoryBar">
              <div
                className="categoryScore"
                style={{
                  height: "1rem",
                  width: `${score * 10}%`,
                  backgroundColor: `${color}`
                }}
              ></div>           
            </div>              
            <p className="shownScore">{score > 0 ? `${score}/10` : "N/A"}</p>
          </div>
        </div>
      </div>
    );
}
 
export default GraphBar;