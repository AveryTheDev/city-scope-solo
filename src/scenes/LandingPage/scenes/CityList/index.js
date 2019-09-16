import React, { useEffect, useState } from 'react';
import { fetchCities } from '../../../../services/api/components/CityList'

import './styles.css';

const CityList = () => {
    const [ cityOptions, setCityOptions ] = useState([]);

    useEffect (() => {      
        (async function() {
            setCityOptions(await fetchCities());
        })();

    }, [])

    let list;

    if(cityOptions.length > 0) {
        list = cityOptions.map((city) => <p id={city.})
    }

    return ( 
        <div className="name-list">
            {list} 
        </div>
     );
}
 
export default CityList;