import React, { useEffect, useState } from 'react';

import { fetchCities } from '../../../../services/api/components/CityList';
import { getCityBySearchTerm } from '../../../../services/api/components/CityFromSearch';

import './styles.css';
import City from './City';

const CityList = () => {
    const [ cityOptions, setCityOptions ] = useState([]);

    useEffect (() => {      
        (async function() {
            setCityOptions(await fetchCities());
        })();

    }, [])

    const searchByTerm = (term) => {
        const searchTerm = term;

        getCityBySearchTerm(searchTerm);
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