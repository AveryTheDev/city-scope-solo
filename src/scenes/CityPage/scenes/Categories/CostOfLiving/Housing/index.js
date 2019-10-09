import "./styles.css";

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from "../../../../../../services/context/ChosenCityContext";
import { fetchHousing } from "../../../../../../services/api/components/categories/Housing";
import { ComparisonContext } from "../../../../../../services/context/ComparisonContext";

const Housing = ({ secondCity }) => {
  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext);
  const [housing, setHousing] = useState({
    small: "",
    medium: "",
    large: ""
  });

  useEffect(() => {
    const city = secondCity ? comparison : chosenCity;
    (async function() {
      setHousing(await fetchHousing(city.urbanScores));
    })();
  }, [chosenCity, comparison, secondCity]);

  if (housing.large.length > 0) {
    return (
      <>
        <h2>Housing</h2>
        <p>
          Average Small Apartment Rent: <span>${housing.small} USD</span>
        </p>
        <p>
          Average Medium Apartment Rent: <span>${housing.medium} USD</span>
        </p>
        <p>
          Average Large Apartment Rent: <span>${housing.large} USD</span>
        </p>
      </>
    );
  }

  return <div></div>;
};
 
export default Housing;