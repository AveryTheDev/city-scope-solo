import './styles.css';

import React from 'react'; 

const City = ({ city, searchByTerm, hideModal }) => {
    return ( 
            <p className="modal-city" onClick={() => {searchByTerm(city); hideModal(false);}}>
                {city}
            </p>
     );
}
 
export default City;