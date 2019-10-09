import React, { useContext, useState, useEffect, useRef } from "react";
import { ChosenCityContext } from "../../../../services/context/ChosenCityContext";
import { fetchCities } from "../../../../services/api/components/CityList";
import { getCityBySearchTerm } from "../../../../services/api/components/CityFromSearch";

import CityChoice from "./CityChoice";
import './styles.css';
import { ComparisonContext } from "../../../../services/context/ComparisonContext";

const CityDropDown = ({ comparison }) => {
  const [cityList, setCityList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const { chosenCity, setChosenCity } = useContext(ChosenCityContext);
  const { setComparison } = useContext(ComparisonContext);

  const cityButton = useRef();

  useEffect(() => {
    (async function() {
      setCityList(await fetchCities());
    })();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuOpen]);

  const handleClick = e => {
    if (cityButton.current.contains(e.target)) {
      return;
    } else {
      setMenuOpen(false);
    }
  };

  const searchByTerm = term => {
    const searchTerm = term;

    const getCityInfo = async searchTerm => {
      if(comparison !== undefined) {
        return setComparison(await getCityBySearchTerm(searchTerm));        
      }
        return setChosenCity(await getCityBySearchTerm(searchTerm));
    };

    getCityInfo(searchTerm);
    setMenuOpen(false);
  };

  let list;

  if (cityList.length > 0) {
    list = cityList.map((city, index) => {
      return <CityChoice city={city} key={index} select={searchByTerm} />;
    });
  }

  let city = chosenCity.cityName;

  if (comparison !== undefined) {
    city = comparison.cityName;
  }

  if (menuOpen) {

    return (
      <div ref={cityButton} className="dropdown">
        <div className="dropdown-trigger">
          <button onClick={e => setMenuOpen(!menuOpen)}>
            {city}
          </button>
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-content">{list}</div>
        </div>
      </div>
    );
  } else {

    return (
      <div ref={cityButton} className="dropdown">
        <div className="dropdown-trigger">
          <button onClick={e => setMenuOpen(!menuOpen)}>
            {city}
          </button>
        </div>
      </div>
    );
  }
};

export default CityDropDown;
