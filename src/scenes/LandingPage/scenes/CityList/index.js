import React, { useEffect, useState } from 'react';
import { fetchCities } from '../../../../services/api/components/CityList'


const CityList = () => {
    const [ cityOptions, setCityOptions ] = useState([]);

    useEffect (() => {      
        (async function() {
            setCityOptions(await fetchCities());
        })();
    }, [])


    let list;

    if(cityOptions) {
        list = cityOptions.map( city => <p>{city}</p> )
    }

    return ( 
        <div>
            {list}
        </div>
     );
}
 
export default CityList;