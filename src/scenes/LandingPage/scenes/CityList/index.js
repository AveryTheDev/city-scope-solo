import React, { useEffect, useState, useContext } from 'react';

import { fetchCities } from '../../../../services/api/components/CityList';
import { getCityBySearchTerm } from '../../../../services/api/components/CityFromSearch';

import './styles.css';
import City from './City';
import { ChosenCityContext } from '../../../../services/context/ChosenCityContext';

const CityList = () => {
    const [ cityOptions, setCityOptions ] = useState([]);
    const { setChosenCity } = useContext(ChosenCityContext)

    useEffect (() => {      
        (async function() {
            setCityOptions(await fetchCities());
        })();

    }, [])

    const searchByTerm = (term) => {
        const searchTerm = term;

        const setCity = async (searchTerm) => {
            setChosenCity(await getCityBySearchTerm(searchTerm));
        };

        setCity(searchTerm);
    }

    let list;

    if(cityOptions.length > 0) {
        list = cityOptions.map((city) => <City city={city} searchByTerm={searchByTerm}/>)
    }

    return ( 
        <div className="name-list">
            {list} 
        </div>
     );
}
 
export default CityList;