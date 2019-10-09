import teleport from "../../../teleport";

export const fetchEducation = async urbanScores => {
  let chosenCity = urbanScores;
  let education = {
    overallRanking: 0,
    meanMathValue: 0,
    meanReadingValue: 0,
    meanScienceValue: 0
  };

  let overallRanking, meanMathValue, meanReadingValue, meanScienceValue;

  const statFormat = async educationValue => {
    let x = educationValue;

    if (!x) return 0;
    return (x = x.toPrecision(3));
  };

  const fetchData = async chosenCity => {
    let cityDetails = await teleport.get(chosenCity);
    cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

    let cityEducation = await teleport.get(cityDetails);
    cityEducation = cityEducation.data.categories.find(
      category => category.id.toUpperCase() === "EDUCATION"
    );

    if(cityEducation === undefined) return;

   else {
        overallRanking = cityEducation.data.find(
          x => x.id === "PISA-RANKING-TELESCORE"
        );
        meanMathValue = cityEducation.data.find(
          x => x.id === "PISA-DETAIL-MATH-MEAN-SCORES"
        );
        meanReadingValue = cityEducation.data.find(
          x => x.id === "PISA-DETAIL-READING-MEAN-SCORES"
        );
        meanScienceValue = cityEducation.data.find(
          x => x.id === "PISA-DETAIL-SCIENCE-MEAN-SCORES"
        );
        
        overallRanking = await statFormat(overallRanking.float_value * 100);
        meanMathValue = await statFormat(meanMathValue.float_value);
        meanReadingValue = await statFormat(meanReadingValue.float_value);
        meanScienceValue = await statFormat(meanScienceValue.float_value);

      return (
        education = {
            overallRanking,
            meanMathValue,
            meanReadingValue,
            meanScienceValue
        }
      );
    }
  };

   education = await fetchData(chosenCity);

   return education;
};
