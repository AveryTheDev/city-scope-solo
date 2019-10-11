import React, { useEffect, useState, useContext } from 'react';

import { fetchCities } from '../../../../services/api/components/CityList';
import { getCityBySearchTerm } from '../../../../services/api/components/CityFromSearch';

import './styles.css';
import City from './City';

import { ChosenCityContext } from '../../../../services/context/ChosenCityContext';
import {withRouter} from 'react-router-dom'

const CityList = withRouter(({history}) => {
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
            history.push('/citypage');
        };

        setCity(searchTerm);        
    }

    let list;

    if(cityOptions.length > 0) {
        list = cityOptions.map((city, index) => (
          <City city={city} key={index} searchByTerm={searchByTerm} />
        ));
    }

    return ( 
        <div className="name-list">
            {list} 
        </div>
     );
})
 
export default CityList;