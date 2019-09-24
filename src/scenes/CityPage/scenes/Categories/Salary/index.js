import "./styles.css";

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from "../../../../../services/context/ChosenCityContext";
import { fetchProfessions } from "../../../../../services/api/components/categories/Salary";

const Salary = () => {

    const [ professions, setProfessions ] = useState([])
    const { chosenCity } = useContext(ChosenCityContext);

    useEffect (() => {
        (async function () {
            setProfessions(await fetchProfessions(chosenCity.urbanScores))
        })();
    }, [chosenCity.urbanScores])


    if(professions) {
        const professionOptions = professions.map(x => <p key={x}>{x}</p>);
        
        return (
            <div>
                <h1>Salary</h1>
                {professionOptions}
            </div>
        )
    }

    return ( 
        <div>
            Salary
        </div>
     );
}
 
export default Salary;