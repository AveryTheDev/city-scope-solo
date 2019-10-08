import './styles.css'

import React, { useState, useEffect, useContext } from "react";
import { ChosenCityContext } from '../../../../../services/context/ChosenCityContext';
import { fetchEducation } from '../../../../../services/api/components/categories/Education';
import { ComparisonContext } from '../../../../../services/context/ComparisonContext';

const Education = ({ secondCity }) => {
  const { chosenCity } = useContext(ChosenCityContext);
  const { comparison } = useContext(ComparisonContext);
  const [education, setEducation] = useState({
    overallRanking: 0,
    meanMathValue: 0,
    meanReadingValue: 0,
    meanScienceValue: 0
  });

  useEffect(() => {
    const city = secondCity ? comparison : chosenCity;
    (async function() {
      setEducation(await fetchEducation(city.urbanScores));
    })();
  }, [chosenCity, comparison, secondCity]);

  if (education.meanMathValue > 0) {
    return (
      <div className="education">
        <h1>Education</h1>
        <h2>What is PISA?</h2>
        <p className="pisaInfo">
          PISA is an international testing system given to 15 year olds in
          participating countries as a way of assessing how countries
          educational systems compare in terms of quality. This test is given at
          the age of 15 as many countries allow students at this age to chose
          whether to continue proceeding with their education at this point.
        </p>
        <h3>{chosenCity.cityName}</h3>
        <p>Overall Ranking: {education.overallRanking} out of 100</p>
        <p>Average Math PISA Score: {education.meanMathValue}</p>
        <p>Average Reading PISA Score: {education.meanReadingValue}</p>
        <p>Average Science PISA Score: {education.meanScienceValue}</p>
      </div>
    );
  }

  return <div>Education</div>;
};
 
export default Education;