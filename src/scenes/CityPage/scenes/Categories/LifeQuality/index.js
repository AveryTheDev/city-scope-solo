import './styles.css';

import React, { useState, useEffect, useContext } from 'react';
import { ChosenCityContext } from '../../../../../services/context/ChosenCityContext';
import { fetchLifeQualityScores } from '../../../../../services/api/components/categories/LifeQuality';

const LifeQuality = () => {

    const { chosenCity } = useContext(ChosenCityContext);
    const [ scores, setScores ] = useState([]);

          useEffect(() => {
            (async function() {
              let results;
              results = await fetchLifeQualityScores(chosenCity.urbanScores)
              console.log("results", results)
              setScores(results);
            })();
          }, [chosenCity.urbanScores]);

    if(scores.length > 0) {
      return ( 
        <>
          <h1>Life Quality Scores</h1>
          <div>
              {scores.map(x => <p style={{ color: x.color}}>{x.name} {x.score}</p>)}
          </div>
        </>
      );      
    }
    else {
      return <div></div>
    }

}
 
export default LifeQuality;