import './styles.css';
import cold from '../../../../../assets/Cold.svg';
import warm from '../../../../../assets/Warm.svg';

import React, { useState, useEffect, useContext } from 'react';
import { ChosenCityContext } from '../../../../../services/context/ChosenCityContext';
import { getClimate } from '../../../../../services/api/components/categories/Climate';
import { ComparisonContext } from '../../../../../services/context/ComparisonContext';

const Climate = ({ secondCity }) => {
  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext);
  const [ loadedTemp, setLoadedTemp ] = useState({
    avgHigh: '',
    avgLow: ''
  })
  const [ loadAsFahren, setLoadAsFahren ] = useState(false);
  const [ climate, setClimate ] = useState({
    climateType: "",
    avgHigh: "",
    avgLow: "",
    success: false
  });
  const [ scale, setScale ] = useState("C°");

  const toFahrenheit = temp => {
        setScale("F°");
        let convertedTemp = ((temp * 9) / 5 + 32).toPrecision(2);
        return convertedTemp;
      };

  useEffect(() => {
    const city = secondCity ? comparison : chosenCity;

    const handleImport = async (results) => {
        setLoadedTemp({
          avgHigh: results.avgHigh,
          avgLow: results.avgLow
        });

      if(loadAsFahren) {
        return setClimate({...climate, avgHigh: toFahrenheit(results.avgHigh), avgLow: toFahrenheit(results.avgLow)})
      }
      else {
        return setClimate(results);
      }
    }

    (async function() {
      await handleImport(await getClimate(city.urbanScores));
    })();
  }, [chosenCity, comparison, secondCity, climate, loadAsFahren]);

  
  const setMetric = (scale, avgHigh, avgLow) => {

    if(loadAsFahren) {
      setScale("C°")
      setLoadAsFahren(false);
      return setClimate({...climate, avgHigh: avgHigh, avgLow: avgLow});
    }
    else {
      setLoadedTemp({avgHigh: avgHigh, avgLow: avgLow});
      setLoadAsFahren(true);
      return setClimate({
        ...climate,
        avgHigh: toFahrenheit(avgHigh),
        avgLow: toFahrenheit(avgLow)
      });
    }
  };

  if (climate) {
    return (
      <div className="climate-info">
        <div className="heading">
          <h1>Climate</h1>
          <button
            className="metric-button"
            onClick={() => {
              setMetric(scale, climate.avgHigh, climate.avgLow);
            }}
          >
            Scale: {scale}
          </button>
        </div>
        <p>{climate.climateType}</p>
        <div className="climate-data">
          <div className="temp-row">
            <img src={warm} alt="sun" />
            <p>
              Average High: {climate.avgHigh} {scale}
            </p>
            <img src={cold} alt="snowflake" />
            <p>
              Average Low: {climate.avgLow} {scale}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};
 
export default Climate;