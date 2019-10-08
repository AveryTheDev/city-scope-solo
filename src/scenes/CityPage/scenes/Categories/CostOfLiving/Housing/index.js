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
        <p>Average Small Apartment Cost: {housing.small} USD</p>
        <p>Average Medium Apartment Cost: {housing.medium} USD</p>
        <p>Average Large Apartment Cost: {housing.large} USD</p>
      </>
    );
  }

  return <div>Housing</div>;
};
 
export default Housing;