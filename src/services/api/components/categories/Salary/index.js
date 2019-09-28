import teleport from '../../../teleport';


export const fetchProfessions = async urbanScores => {
    const chosenCity = urbanScores;

    const fetchProfessions = async (chosenCity) => {
        const city = chosenCity;

        
        let cityDetails = await teleport.get(city);
        cityDetails = cityDetails.data["_links"]["ua:salaries"]["href"];

        const salaryData = await teleport.get(cityDetails);
        const occupations = salaryData.data["salaries"];
        const occupationList = occupations.map(x => x["job"]["title"]);

        return occupationList;
    }

    const professions = await fetchProfessions(chosenCity);

    return professions;
}


export const onProfessionSelect = async (chosenCity, profession = "Accountant") => {
    const resultWithCommas = x => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const city = chosenCity;
    const jobTitle = profession;

    const salaryData = (await teleport.get(
        (await teleport.get(city)).data["_links"]["ua:salaries"]["href"]
    )).data["salaries"];

    const jobTitleData = salaryData.find(x => x["job"]["title"] === jobTitle );

    const jobTitleSalaryAverages = {
      low: resultWithCommas(
        jobTitleData["salary_percentiles"]["percentile_25"].toFixed(2)
      ),
      avg: resultWithCommas(
        jobTitleData["salary_percentiles"]["percentile_50"].toFixed(2)
      ),
      high: resultWithCommas(
        jobTitleData["salary_percentiles"]["percentile_75"].toFixed(2)
      )
    };

    return jobTitleSalaryAverages;
};