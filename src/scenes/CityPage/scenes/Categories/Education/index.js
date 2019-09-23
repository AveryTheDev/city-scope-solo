import './styles.css'

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from '../../../../../services/context/ChosenCityContext';
import { fetchEducation } from '../../../../../services/api/components/categories/Education';

const Education = () => {

    const { chosenCity } = useContext(ChosenCityContext);
    const [education, setEducation] = useState({
      overallRanking: 0,
      meanMathValue: 0,
      meanReadingValue: 0,
      meanScienceValue: 0
    });

    useEffect (() => {
        (async function () {
            setEducation(await fetchEducation(chosenCity.urbanScores))
        })();
    }, [chosenCity.urbanScores])

    if(education.meanMathValue > 0) {
        return (
            <div>
                <h1>Education</h1>
                <p>{education.overallRanking}</p>
                <p>{education.meanMathValue}</p>
                <p>{education.meanReadingValue}</p>
                <p>{education.meanScienceValue}</p>
            </div>
        )
    }

    return ( 
        <div>
            Education
        </div>
     );
}
 
export default Education;