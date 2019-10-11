import React from 'react'; 

import './styles.css'

const City = ({ city, searchByTerm }) => {
    return ( 
            <p className="city-option" onClick={() => searchByTerm({city})}>
                {city}
            </p>
     );
}
 
export default City;