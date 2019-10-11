import './styles.css';

import React, { useContext, useEffect, useState } from 'react';

import { ChosenCityContext } from '../../../../services/context/ChosenCityContext';
import { ComparisonContext } from '../../../../services/context/ComparisonContext';

import { getCityBySearchTerm } from '../../../../services/api/components/CityFromSearch';
import City from './City';

import { withRouter } from 'react-router-dom';
import { fetchCities } from '../../../../services/api/components/CityList';

const Modal = withRouter(({history, secondCity}) => {
    const [ term, setTerm ] = useState('');
    const [cityOptions, setCityOptions] = useState([]);

    const { chosenCity, setChosenCity } = useContext(ChosenCityContext);
    const { comparison, setComparison } = useContext(ComparisonContext);

    useEffect(() => {
      (async function() {
        setCityOptions(await fetchCities());
      })();
    }, []);

    const onInputChange = e => {
        setTerm(e.target.value);
    }

    const submitFirstCity = e => {
        e.preventDefault();

        const setCity = async term => {
            setChosenCity(await getCityBySearchTerm(term));
        }

        setCity(term);

        history.push('/comparison');
    }

    const submitSecondCity = e => {
        e.preventDefault();

        const setCity = async term => {
            setComparison(await getCityBySearchTerm(term));
        }

        setCity(term);

        history.push('/comparison');
    }

    const searchForFirstCity = term => {
      const searchTerm = term;

      const setCity = async searchTerm => {
        setChosenCity(await getCityBySearchTerm(searchTerm));
        history.push('/comparison');
      };

      setCity(searchTerm);
    };

    const searchForSecondCity= term => {
      const searchTerm = term;

      const setCity = async searchTerm => {
        setComparison(await getCityBySearchTerm(searchTerm));
        history.push('/comparison');
      };

      setCity(searchTerm);
    };

    let list;

    if (cityOptions.length > 0 && secondCity) {
      list = cityOptions.map((city, index) => (
        <City city={city} key={index} searchByTerm={searchForFirstCity} />
      ));
    } else if (cityOptions.length > 0) {
      list = cityOptions.map((city, index) => (
        <City city={city} key={index} searchByTerm={searchForSecondCity} />
      ));
    }
      
    const city = secondCity ? comparison.cityName : chosenCity.cityName;
    const action = secondCity ? submitFirstCity : submitSecondCity;

    return (
      <div className="modal">
          <div className="modal-left">
            <h1>Pick A City To Compare With {city}</h1>
            <form onSubmit={action}>
            <input
                placeholder="Compare with..."
                value={term}
                onChange={onInputChange}
            />
            </form>            
          </div>
        <div className="options-list">{list}</div>
      </div>
    );
})
 
export default Modal;