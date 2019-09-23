import "./styles.css";

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from "../../../../../../services/context/ChosenCityContext";
import { fetchHousing } from "../../../../../../services/api/components/categories/Housing";

const Housing = () => {
     const { chosenCity } = useContext(ChosenCityContext);
     const [ housing, setHousing ] = useState({
        small: '', medium: '', large: ''
     });

     useEffect (() => {
         (async function () {
             setHousing(await fetchHousing(chosenCity.urbanScores))
         })();
     }, [chosenCity.urbanScores])

    if(housing.large.length > 0) {
        return (
            <div>
                <h1>Housing</h1>
                <p>Average Small Apartment Cost: {housing.small} USD</p>
                <p>Average Medium Apartment Cost: {housing.medium} USD</p>
                <p>Average Large Apartment Cost: {housing.large} USD</p>                
            </div>
        )
    }

    return ( 
        <div>Housing</div>
     );
}
 
export default Housing;