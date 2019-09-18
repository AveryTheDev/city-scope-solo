import React, { createContext, useState } from 'react';

export const ChosenCityContext = createContext();

const ChosenCityContextProvider = props => {
    const [chosenCity, setChosenCity] = useState({
        urbanScores: '',
        geoname_id: 0,
        cityImage: '',
        cityName: '',
        isChosen: false
    })


    return ( 
        <ChosenCityContext.Provider value={{chosenCity, setChosenCity}}>
            {props.children}
        </ChosenCityContext.Provider>
     );
}
 
export default ChosenCityContextProvider;