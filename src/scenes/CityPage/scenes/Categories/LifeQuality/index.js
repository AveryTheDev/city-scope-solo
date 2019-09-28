import './styles.css';

import React, { useState, useEffect, useContext } from 'react';
import { ChosenCityContext } from '../../../../../services/context/ChosenCityContext';
import { fetchLifeQualityScores } from '../../../../../services/api/components/categories/LifeQuality';

import GraphBar from './component/GraphBar';

const LifeQuality = () => {

    const { chosenCity } = useContext(ChosenCityContext);
    const [ scores, setScores ] = useState([]);

          useEffect(() => {
            (async function() {
              setScores(await fetchLifeQualityScores(chosenCity.urbanScores));
            })();
          }, [chosenCity.urbanScores]);

    if(scores.length) {
      const bars = scores.map(x => <GraphBar color={x.color} key={x.name} name={x.name} score={x.score}/>)
      
      return ( 
        <>
          <h1 className="quality-header">Life Quality Scores</h1>
          <div className="quality-data">
              {bars}
          </div>
        </>
      );      
    }
    else {
      return <div></div>
    }

}
 
export default LifeQuality;