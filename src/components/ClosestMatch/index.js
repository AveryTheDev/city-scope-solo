import "./styles.css";

import React, { useState, useContext, useEffect } from "react";
import { ChosenCityContext } from "../../services/context/ChosenCityContext";
import { ComparisonContext } from "../../services/context/ComparisonContext";

const ClosestMatch = () => {
  const [display, setDisplay] = useState(false);
  const [cityAlert, setCityAlert] = useState({
    cityName: '',
    closestCity: ''
  })

  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext);

useEffect(() => {
  if(!comparison.match && comparison.cityName !== comparison.closestCity) {
    setDisplay(true);
    setCityAlert({
      cityName: comparison.cityName,
      closestCity: comparison.closestCity
    })
  }
  else if(!chosenCity.match && chosenCity.cityName !== chosenCity.closestCity) {
    setDisplay(true);
    setCityAlert({
      cityName: chosenCity.cityName,
      closestCity: chosenCity.closestCity
    })
  }
}, [comparison, chosenCity])

  const closestCityStyle = display ? "closest-match" : "hidden";

   if(display){ 
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
              {cityAlert.closestCity}
            </span>{" "}
            was not found in our database, but we found a close match...
          </h3>
          <p className="closest-match__message">
            Although we don't have any information on{" "}
            <span className="closest-match--city">
              {cityAlert.closestCity}
            </span>
            , we figured showing you the info we had on{" "}
            <span className="closest-match--city">{cityAlert.cityName}</span>{" "}
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
