import React, {useState, useEffect, useContext} from 'react';
import { fetchCitiesWithContinent } from '../../services/api/components/CityList';
import Continent from './Continent';
import { ChosenCityContext } from '../../services/context/ChosenCityContext';

import {withRouter} from 'react-router-dom';
import { getCityBySearchTerm } from '../../services/api/components/CityFromSearch';
import { ListLoader } from '../Loading';

const ContinentCityList = withRouter(({history}) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [continentCities, setContinentCities] = useState([])
    const {setChosenCity} = useContext(ChosenCityContext);

    useEffect(() => {
        (async function() {
            setContinentCities(await fetchCitiesWithContinent());
            setIsLoading(false);
        })()
    }, [])
    
   const renderContinents = continentObj => {

    let continentData = continentObj;
    let renderedContent = [];
    
    
    const searchByTerm = term => {
      const searchTerm = term;

      const setCity = async searchTerm => {
        setChosenCity(await getCityBySearchTerm(searchTerm));
        history.push("/citypage");
      };

      setCity(searchTerm);
    };


    for(let continent in continentData) {
        renderedContent.push(<Continent continent={continent} continentValues={continentData[continent]} searchByTerm={searchByTerm}/>)
    }

    return renderedContent;
   }

   if(isLoading) {
       return <ListLoader />
   }

    return ( 
        <div>
            {renderContinents(continentCities)}
        </div>
     );
})
 
export default ContinentCityList;