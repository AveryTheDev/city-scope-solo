import React, { useContext } from 'react';
import { ChosenCityContext } from '../../services/context/ChosenCityContext';

import NavBar from '../../components/NavBar';
import Categories from '../CityPage/scenes/Categories';
import CityDisplay from './scenes/CityDisplay';

import './styles.css';
import SearchBar from '../../components/Search';
import CityList from '../LandingPage/scenes/CityList';

const CityPage = () => {

    const {chosenCity} = useContext(ChosenCityContext);

    if(chosenCity.inDatabase) {
        return ( 
            <> 
                <div className="city-page desktop">
                    <NavBar />
                    <div className="city-content">
                        <CityDisplay/>     
                        <div className ="category-panel">
                            <Categories/>                    
                        </div>               
                    </div>
                </div>
                <div className="city-page mobile">
                    <NavBar />
                    <div className="city-content">
                        <CityDisplay/>     
                        <div className ="category-panel">
                            <Categories/>                    
                        </div>               
                    </div>
                </div>
            </>
        );
    } 

    return (
        <div>
            <NavBar />            
        <div className="no-results">
            <h1>We Couldn't Find That In Our Database</h1>
            <h2>Please Try Entering A New Search Term...</h2>
            <SearchBar />
            <h3>Or Choose From The List Of Cities Below</h3>
            <CityList />
        </div>            
        </div>

    );

}
 
export default CityPage;