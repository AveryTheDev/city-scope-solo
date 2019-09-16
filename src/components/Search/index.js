import React, { useState, useContext } from 'react'; 
import { citySearch } from '../../services/api/components/CitySearch';

import './styles.css'

const SearchBar = () => {

    const [term, setTerm] = useState('');

    const onInputChange = e => {
        setTerm(...e.target.value);
    }

    const onTermSubmit = e => {
        e.preventDefault();

        citySearch(term);
    }

    return (
      <form onSubmit={onTermSubmit}>
        <input
          placeholder="Search Your City..."
          value={term}
          onChange={onInputChange}
        />
      </form>
    ); 
}
 
export default SearchBar;