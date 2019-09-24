import "./styles.css";

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from "../../../../../services/context/ChosenCityContext";
import { fetchGlobalSafety } from "../../../../../services/api/components/categories/Safety";


const Safety = () => {

    const { chosenCity } = useContext(ChosenCityContext);
    const [ cityStats, setCityStats] = useState({});
    const [ globalStats, setGlobalStats ] = useState({
        cities: [],
        guns: [],
        deaths: []
    });

    useEffect (() => {
        (async function () {
            setGlobalStats(await fetchGlobalSafety());
        })();
    }, [chosenCity.urbanScores])

    if(globalStats) {

        return (
            <div>
                <h1>Safety</h1>
                <h2>Compared to...</h2> 
                <div>
                    {globalStats.cities}
                    {globalStats.guns}
                    {globalStats.deaths}
                </div>                     
            </div>
        )
    }

    return ( 
        <div>
            Safety
        </div>
     );
}
 
export default Safety;