import './styles.css';

import React, { useContext, useEffect, useState } from 'react';

import { ChosenCityContext } from '../../../../services/context/ChosenCityContext';
import { ComparisonContext } from '../../../../services/context/ComparisonContext';

import { getCityBySearchTerm } from '../../../../services/api/components/CityFromSearch';
import City from './City';

import { withRouter } from 'react-router-dom';
import { fetchCities } from '../../../../services/api/components/CityList';

const Modal = withRouter(({history}) => {
    const [ term, setTerm ] = useState('');
    const [cityOptions, setCityOptions] = useState([]);

    const { chosenCity } = useContext(ChosenCityContext);
    const { setComparison } = useContext(ComparisonContext);

    useEffect(() => {
      (async function() {
        setCityOptions(await fetchCities());
      })();
    }, []);

    const onInputChange = e => {
        setTerm(e.target.value);
    }

    const onTermSubmit = e => {
        e.preventDefault();

        const setCity = async term => {
            setComparison(await getCityBySearchTerm(term));
        }

        setCity(term);
        history.replace('/comparison');
    }

        let list;

        if (cityOptions.length > 0) {
          list = cityOptions.map((city, index) => (
            <City city={city} key={index} searchByTerm={onTermSubmit} />
          ));
        }

    return (
      <div className="modal">
          <div className="modal-left">
            <h1>Pick A City To Compare With {chosenCity.cityName}</h1>
            <form onSubmit={onTermSubmit}>
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