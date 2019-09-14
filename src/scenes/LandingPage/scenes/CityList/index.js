import React, { useEffect, useState } from 'react';
import { fetchCities } from '../../../../services/api/components/CityList'


const CityList = () => {
    const [ cityOptions, setCityOptions ] = useState([]);

    useEffect (() => {
        fetchCities();
        console.log("useEffect has fired")
    }, [])

    return ( 
        <div>
            CityList
        </div>
     );
}
 
export default CityList;