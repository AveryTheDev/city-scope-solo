import React, { useContext, useEffect, useState } from "react";
import "./styles.css";

import CityDropDown from "./CityDropDown";
import Modal from '../Modal';
import ReactHtmlParser from "react-html-parser";
import { ChosenCityContext } from "../../../../services/context/ChosenCityContext";
import { fetchCityDescription } from "../../../../services/api/components/categories/CityDescription";

import { ComparisonContext } from "../../../../services/context/ComparisonContext";

const CityDisplay = ({secondCity}) => {
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);

  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext);

  useEffect(() => {
    const city = secondCity ? comparison : chosenCity;
    (async function() {
      setDescription(await fetchCityDescription(city.urbanScores));
    })();
  }, [comparison, chosenCity, secondCity]);

  if(secondCity) {
      return (
        <>
          <div className="city-display">
            <div className="img-container">
              <img src={comparison.cityImage} alt={comparison.cityName} />
              <div className="menu-container">
                <CityDropDown comparison={comparison}/>
              </div>
            </div>
            <h1>The City of {comparison.cityName}</h1>
            <div className="description-text">{ReactHtmlParser(description)}</div>
            <div className="compare-button-container">
              <button onClick={() => setModal(!modal)}>Compare City</button>
            </div>
          </div>
          <div className={modal ? 'active' : 'inactive'}>
            <Modal secondCity/>            
          </div>
        </>
      );
  }

  return (
    <>
      <div className="city-display">
        <div className="img-container">
          <img src={chosenCity.cityImage} alt={chosenCity.cityName} />
          <div className="menu-container">
            <CityDropDown />
          </div>
        </div>
        <h1>The City of {chosenCity.cityName}</h1>
        <div className="description-text">{ReactHtmlParser(description)}</div>
        <div className="compare-button-container">
          <button onClick={() => setModal(!modal)}>Compare City</button>
        </div>
      </div>
      <div className={modal ? 'active' : 'inactive'}>
        <Modal />
      </div>
    </>
  );
};

export default CityDisplay;
