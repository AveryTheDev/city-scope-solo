import React, { useContext } from 'react';
import { ChosenCityContext } from '../../services/context/ChosenCityContext';

import NavBar from '../../components/NavBar';
import Categories from '../CityPage/scenes/Categories';
import CityDisplay from './scenes/CityDisplay';

import './styles.css';

const CityPage = () => {

    const {chosenCity} = useContext(ChosenCityContext);

    if(chosenCity.isChosen) {
        return ( 
            <div className="city-page">
                <NavBar />
                <div className="city-content">
                    <CityDisplay/>     
                    <div className ="category-panel">
                        <Categories/>                    
                    </div>               
                </div>
            </div>
        );
    }
    return (
      <div>
        <NavBar />
        <div>No City Found</div>
      </div>
    );

}
 
export default CityPage;