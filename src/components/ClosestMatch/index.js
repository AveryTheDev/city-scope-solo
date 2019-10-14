import "./styles.css";

import React, { useState, useContext } from "react";
import { ChosenCityContext } from "../../services/context/ChosenCityContext";
import { ComparisonContext } from "../../services/context/ComparisonContext";

const ClosestMatch = ({secondCity}) => {
  const [display, setDisplay] = useState(true);
  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext)

  const closestCityStyle = display ? "closest-match" : "hidden";

  if (secondCity && comparison.cityName && !comparison.match) {
    return (
      <div className={closestCityStyle}>
        <div className="closest-match__container">
          <div className="closest-match__exit-container">
            <p
              className="closest-match__exit"
              onClick={() => setDisplay(false)}
            >
              X
            </p>
          </div>
          <h3 className="closest-match__header">
            <span className="closest-match--city">
              {comparison.closestCity}
            </span>{" "}
            was not found in our database, but we found a close match...
          </h3>
          <p className="closest-match__message">
            Although we don't have any information on{" "}
            <span className="closest-match--city">
              {comparison.closestCity}
            </span>
            , we figured showing you the info we had on{" "}
            <span className="closest-match--city">{comparison.cityName}</span>{" "}
            would be the next best thing due to their close proximity to each
            other.
          </p>
        </div>
      </div>
    );
  }

  else if (chosenCity.cityName && !chosenCity.match) {
    return (
      <div className={closestCityStyle}>
        <div className="closest-match__container">
          <div className="closest-match__exit-container">
            <p
              className="closest-match__exit"
              onClick={() => setDisplay(false)}
            >
              X
            </p>
          </div>
          <h3 className="closest-match__header">
            <span className="closest-match--city">
              {chosenCity.closestCity}
            </span>{" "}
            was not found in our database, but we found a close match...
          </h3>
          <p className="closest-match__message">
            Although we don't have any information on{" "}
            <span className="closest-match--city">
              {chosenCity.closestCity}
            </span>
            , we figured showing you the info we had on{" "}
            <span className="closest-match--city">{chosenCity.cityName}</span>{" "}
            would be the next best thing due to their close proximity to each
            other.
          </p>
        </div>
      </div>
    );
  } 
  
  else return <></>;
};

export default ClosestMatch;
