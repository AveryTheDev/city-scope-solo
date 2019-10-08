import './styles.css'

import React, {useContext} from 'react';
import NavBar from '../../components/NavBar'
import Categories from '../CityPage/scenes/Categories';
import CityDisplay from '../CityPage/scenes/CityDisplay';
import { ComparisonContext } from '../../services/context/ComparisonContext';

const ComparisonPage = () => {

    const { comparison } = useContext(ComparisonContext);

    return ( 
        <div>
            <NavBar/>
            <div className="comparison-container">
                    <div className="first-city">
                        <CityDisplay />
                        <Categories />                        
                    </div>
                    <div className="second-city">
                        <CityDisplay comparison={comparison}/>
                        <Categories secondCity/>                         
                    </div>                   
            </div>
        </div>
     );
}
 
export default ComparisonPage;