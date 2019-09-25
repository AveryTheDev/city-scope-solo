import React, { useContext, useState, useEffect, useRef } from "react";
import { ChosenCityContext } from "../../../../services/context/ChosenCityContext";
import { fetchCities } from "../../../../services/api/components/CityList";
import { getCityBySearchTerm } from "../../../../services/api/components/CityFromSearch";

import CityChoice from "./CityChoice";
import './styles.css';

const CityDropDown = () => {

  const [cityList, setCityList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);  
  const { chosenCity, setChosenCity } = useContext(ChosenCityContext);
  const cityButton = useRef();

  useEffect(() => {
    (async function() {
      setCityList(await fetchCities());
    })();
  }, []);

  useEffect(() => {
    if(menuOpen) {
        document.addEventListener("mousedown", handleClick);  
    }
    else {
        document.removeEventListener("mousedown", handleClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [menuOpen]);

  const handleClick = e => {
    if(cityButton.current.contains(e.target)) {
      return;
    }
    else {
      setMenuOpen(false);    
    }
  }

  const searchByTerm = term => {
    const searchTerm = term;

    const setCity = async searchTerm => {
      setChosenCity(await getCityBySearchTerm(searchTerm));
    };

    setCity(searchTerm);
    setMenuOpen(false);
  };

  let list;

  if (cityList.length > 0) {
    list = cityList.map((city, index) => {
      return <CityChoice city={city} key={index} select={searchByTerm}/>;
    });
  }

  if(menuOpen) {
    return (
        <div ref={cityButton} className="dropdown">
          <div className="dropdown-trigger" >
            <button  onClick = {e => setMenuOpen(!menuOpen)}>
              {chosenCity.cityName}
            </button>
          </div> 
          <div className="dropdown-menu">
            <div className="dropdown-content">
                {list}                     
            </div>
          </div>  
        </div>
    );    
  }
  else {
    return (
      <div ref={cityButton} className="dropdown">
        <div className="dropdown-trigger">
          <button onClick={e => setMenuOpen(!menuOpen)}>{chosenCity.cityName}</button>
        </div>
      </div>
    )
  }
};

export default CityDropDown;
