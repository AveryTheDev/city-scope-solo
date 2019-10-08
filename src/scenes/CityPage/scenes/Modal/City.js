import React from 'react'; 

const City = ({ city, searchByTerm }) => {
    return ( 
            <p onClick={() => searchByTerm({city})}>
                {city}
            </p>
     );
}
 
export default City;