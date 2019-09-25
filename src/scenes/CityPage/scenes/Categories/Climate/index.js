import './styles.css';
import cold from '../../../../../assets/Cold.svg';
import warm from '../../../../../assets/Warm.svg';

import React, { useState, useEffect, useContext } from 'react';
import { ChosenCityContext } from '../../../../../services/context/ChosenCityContext';
import { getClimate } from '../../../../../services/api/components/categories/Climate';

const Climate = () => {

    const { chosenCity } = useContext(ChosenCityContext);
      const [climate, setClimate] = useState({
        climateType: "",
        avgHigh: "",
        avgLow: "",
        success: false
      });
      const [scale, setScale] = useState("C°");

      useEffect (() => {
        ( async function () {
          setClimate(await getClimate(chosenCity.urbanScores))
        })();
      }, [chosenCity.urbanScores])

        const setMetric = (scale, avgHigh, avgLow) => {
          let system = scale;
          let high = parseFloat(avgHigh);
          let low = parseFloat(avgLow);

          const toFahrenheit = temp => {
            setScale("F°");
            let convertedTemp = ((temp * 9) / 5 + 32).toPrecision(2);
            return convertedTemp;
          };

          const toCelsius = temp => {
            setScale("C°");
            let convertedTemp = (((temp - 32) * 5) / 9).toPrecision(2);
            return convertedTemp;
          };

          if (system === "C°") {
            high = toFahrenheit(high);
            low = toFahrenheit(low);

            return setClimate({
              ...climate,
              avgHigh: high,
              avgLow: low
            });
          } else {
            high = toCelsius(high);
            low = toCelsius(low);

            return setClimate({
              ...climate,
              avgHigh: high,
              avgLow: low
            });
          }
        };

      if(climate) {
        return (
          <div className="climate-info">
            <div className="heading">
              <h1>Climate</h1>
              <button className="metric-button" onClick={() => {setMetric(scale, climate.avgHigh, climate.avgLow)}}>Scale: {scale}</button>              
            </div>
              <p>{climate.climateType}</p>        
            <div className="climate-data">
              <div className="temp-row">
                <img src={warm} alt="sun"/>
                <p>Average High: {climate.avgHigh} {scale}</p>
                <img src={cold} alt="snowflake" />
                <p>Average Low: {climate.avgLow} {scale}</p>      
              </div>        
            </div>    
          </div>
        );
      }

    return ( 
        <div>
        </div>
     );
}
 
export default Climate;