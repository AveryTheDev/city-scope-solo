import './styles.css'

import React, {useContext} from 'react';
import NavBar from '../../components/NavBar'
import Categories from '../CityPage/scenes/Categories';
import CityDisplay from '../CityPage/scenes/CityDisplay';
import { ChosenCityContext } from '../../services/context/ChosenCityContext';
import CityPage from '../CityPage';
import { ComparisonContext } from '../../services/context/ComparisonContext';


const ComparisonPage = () => {

  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext)

  if (chosenCity.cityName === "N/A" || comparison.cityName === "N/A") return <CityPage />;

    return (
      <>
        <div className="compare-desktop">
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