import React, { useContext, useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ChosenCityContext } from "../../../../services/context/ChosenCityContext";
import { fetchCities } from "../../../../services/api/components/CityList";
import { getCityBySearchTerm } from "../../../../services/api/components/CityFromSearch";

import CityChoice from "./CityChoice";

const CityDropDown = () => {
  const [cityList, setCityList] = useState([]);
  const { chosenCity, setChosenCity } = useContext(ChosenCityContext);

  useEffect(() => {
    (async function() {
      setCityList(await fetchCities());
    })();
  }, []);

  const searchByTerm = term => {
    const searchTerm = term;

    const setCity = async searchTerm => {
      setChosenCity(await getCityBySearchTerm(searchTerm));
    };

    setCity(searchTerm);
  };

  let list;

  if (cityList.length > 0) {
    list = cityList.map((city, index) => {
      return <CityChoice city={city} key={index} select={searchByTerm} />;
    });
  }

  return (
    <Dropdown variant="custom">
      <DropdownButton variant="city-name" title={chosenCity.cityName}>
        <Dropdown.Item className="drop-down-menu">{list}</Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};

export default CityDropDown;
