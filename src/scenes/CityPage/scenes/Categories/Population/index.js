import "./styles.css";

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from "../../../../../services/context/ChosenCityContext";
import teleport from '../../../../../services/api/teleport';
import { ComparisonContext } from "../../../../../services/context/ComparisonContext";

const Population = ({ secondCity }) => {
  const [population, setPopulation] = useState("");

  const { chosenCity } = useContext(ChosenCityContext);
  const {comparison} = useContext(ComparisonContext);
  
  useEffect(() => {
    const numberWithCommas = async x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const city = secondCity ? comparison : chosenCity;
    (async function() {
      let cityPop = await teleport.get(
        "cities/geonameid:" + city.geoname_id
      );
      cityPop = await numberWithCommas(cityPop.data["population"]);
      setPopulation(cityPop);
    })();
  }, [chosenCity, comparison, secondCity]);

  if (population) {
    return (
      <div className="population">
        <h1>Population</h1>
        <p>{population}</p>
      </div>
    );
  }

  return <div>Population</div>;
};
 
export default Population;