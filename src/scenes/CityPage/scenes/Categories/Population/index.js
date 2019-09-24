import "./styles.css";

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from "../../../../../services/context/ChosenCityContext";
import teleport from '../../../../../services/api/teleport';

const Population = () => {
    const [population, setPopulation] = useState('');
    const {chosenCity} = useContext(ChosenCityContext);

    useEffect(()=> {
        const numberWithCommas = async (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        (async function () {
            let cityPop = await teleport.get("cities/geonameid:" + chosenCity.geoname_id);
            cityPop = await numberWithCommas(cityPop.data["population"]);
            setPopulation(cityPop);
        })();
    }, [chosenCity.geoname_id])

    if(population) {
        return (
            <div>
                <h1>Population</h1>
                <p>{population}</p>                
            </div>

        )
    }

    return ( 
    <div>
        Population
    </div> 
    );
}
 
export default Population;