import React, { useContext } from 'react';
import { ChosenCityContext } from '../../services/context/ChosenCityContext';

import NavBar from '../../components/NavBar';
import Categories from '../CityPage/scenes/Categories';
import CityDisplay from './scenes/CityDisplay';

const CityPage = () => {

    const {chosenCity, setChosenCity} = useContext(ChosenCityContext);

    if(chosenCity.isChosen) {
        return ( 
            <div>
                <NavBar />
                <div className="city-content">
                    <Categories/> 
                    <CityDisplay/>
                </div>
            </div>
        );
    }
    return (
        <div>CityPage</div>
    )

}
 
export default CityPage;