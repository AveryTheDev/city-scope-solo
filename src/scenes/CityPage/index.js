import React, { useContext } from 'react';
import { ChosenCityContext } from '../../services/context/ChosenCityContext';
import {Link} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Categories from '../CityPage/scenes/Categories';

const CityPage = () => {

    const {chosenCity, setChosenCity} = useContext(ChosenCityContext);

    if(chosenCity.isChosen) {
        return ( 
            <div>
                <NavBar />
                <Categories/>
            </div>
        );
    }
    return (
        <div>CityPage</div>
    )

}
 
export default CityPage;