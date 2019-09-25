import React from 'react';

const CityChoice = ({city, select}) => {
    return (
      <div onClick={() => select({ city })} className="dropdown-item">
        {city}
      </div>
    );
}
 
export default CityChoice;