import React, { useEffect, useState, useContext } from './node_modules/react';
import { ChosenCityContext } from '../../../../../services/context/ChosenCityContext';

import { getClimate } from '../../../../../services/api/components/categories/Climate';
import { ClimateContext } from '../../../../../services/context/categories/Climate/ClimateContext';

const Climate = () => {

    const { chosenCity } = useContext(ChosenCityContext);
    const { climate, setClimate, setMetric} = useState(ClimateContext);

        useEffect(() => {
          (async function() {
            setClimate(await getClimate(chosenCity));
          })();
        }, []);

    return ( 
        <div>
            <div>{climate.avgHigh}</div>
            <div>{climate.avgLow}</div>
            <div>{climate.tempSystem}</div>
            <div>{climate.climateType}</div>
        </div>
     );
}
 
export default Climate;