import './styles.css';

import React from 'react'; 

const City = ({ city, searchByTerm }) => {
    return ( 
            <p className="modal-city" onClick={() => searchByTerm({city})}>
                {city}
            </p>
     );
}
 
export default City;