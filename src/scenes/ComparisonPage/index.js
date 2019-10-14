import './styles.css'

import React, {useContext} from 'react';
import NavBar from '../../components/NavBar'
import Categories from '../CityPage/scenes/Categories';
import CityDisplay from '../CityPage/scenes/CityDisplay';
import { ChosenCityContext } from '../../services/context/ChosenCityContext';
import CityPage from '../CityPage';
import { ComparisonContext } from '../../services/context/ComparisonContext';
import ClosestMatch from '../../components/ClosestMatch';


const ComparisonPage = () => {

  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext)

  if ( comparison.geoname_id === 0 || chosenCity.geoname_id === 0 ) return <CityPage />;

    return (
      <>
        <div className="compare-desktop">
          <ClosestMatch secondCity/>
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
        <div className="compare-mobile">
          <NavBar />
          <h1>
            Screen Too Small For Comparison
          </h1>
        </div>
      </>
    );
}
 
export default ComparisonPage;