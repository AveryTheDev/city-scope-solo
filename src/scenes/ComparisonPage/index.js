import './styles.css'

import React from 'react';
import NavBar from '../../components/NavBar'
import Categories from '../CityPage/scenes/Categories';
import CityDisplay from '../CityPage/scenes/CityDisplay';

const ComparisonPage = () => {


    return (
      <div>
        <NavBar />
        <div className="comparison-container">
          <div className="first-city">
            <CityDisplay />
            <Categories />
          </div>
          <div className="second-city">
            <CityDisplay secondCity />
            <Categories secondCity />
          </div>
        </div>
      </div>
    );
}
 
export default ComparisonPage;