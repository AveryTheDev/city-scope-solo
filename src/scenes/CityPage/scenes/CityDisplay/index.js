import React, { useContext, useEffect, useState } from 'react';
import './styles.css';

import CityDropDown from './CityDropDown';
import ReactHtmlParser from 'react-html-parser';
import { ChosenCityContext } from '../../../../services/context/ChosenCityContext';
import {fetchCityDescription} from '../../../../services/api/components/categories/CityDescription';

const CityDisplay = () => {
    const [ description, setDescription ] = useState('');
    const { chosenCity } = useContext(ChosenCityContext);

    useEffect(() => {
      (async function() {
          setDescription(await fetchCityDescription(chosenCity.urbanScores));
      })();
    }, []);

    return ( 
        <div className="city-display">
            <div className="img-container">
                <img src={chosenCity.cityImage} alt={chosenCity.cityName}/>
                <div className="menu-container">
                    <CityDropDown />                       
                </div>             
            </div>
            <h1>The City of {chosenCity.cityName}</h1>
            <div className="description-text">{ ReactHtmlParser(description) }</div>
        </div>
     );
}
 
export default CityDisplay;