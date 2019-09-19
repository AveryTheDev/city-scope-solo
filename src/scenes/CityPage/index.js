import React, { useContext } from 'react';
import { ChosenCityContext } from '../../services/context/ChosenCityContext';

import NavBar from '../../components/NavBar';
import Categories from '../CityPage/scenes/Categories';
import CityDisplay from './scenes/CityDisplay';

import './styles.css';

const CityPage = () => {

    const {chosenCity, setChosenCity} = useContext(ChosenCityContext);

    if(chosenCity.isChosen) {
        return ( 
            <div className="city-page">
                <NavBar />
                <div className="city-content">
                    <CityDisplay/>                    
                    <Categories/> 
                </div>
            </div>
        );
    }
    return (
        <div>CityPage</div>
    )

}
 
export default CityPage;