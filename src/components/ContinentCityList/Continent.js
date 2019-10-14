import './styles.css';

import React, {useState, useEffect, useRef} from 'react';
import City from '../../scenes/LandingPage/scenes/CityList/City';

const Continent = ({continent, continentValues, searchByTerm}) => {

    const [displayCities, setDisplayCities] = useState(false);

    const continentHeader = useRef();

   useEffect(() => {
     if (displayCities) {
       document.addEventListener("mousedown", handleClick);
     } else {
       document.removeEventListener("mousedown", handleClick);
     }

     return () => {
       document.removeEventListener("mousedown", handleClick);
     };
   }, [displayCities]);

    const handleClick = e => {
        if (continentHeader.current.contains(e.target)) {
            return;
        } 
        else {
            setDisplayCities(false);
        }
    };

    const cities = continentValues.map((city, index) => (
      <City city={city} key={index} searchByTerm={searchByTerm} />
    ));

    if(displayCities) {
        return ( 
            <div ref={continentHeader}>
                <h3 className="continent_header" onClick={e => setDisplayCities(!displayCities)}>{continent}</h3>
                <ul>
                    {cities}
                </ul>            
            </div>
        );        
    }
    else {
            return (
              <div ref={continentHeader}>
                <h3 className="continent_header" onClick={e => setDisplayCities(!displayCities)}>
                  {continent}
                </h3>
              </div>
            );
    }
}
 
export default Continent;