import React from 'react';

const CityChoice = ({city, select}) => {
    return ( 
        <div onClick={() => select({city})}>
           {city} 
        </div>
     );
}
 
export default CityChoice;