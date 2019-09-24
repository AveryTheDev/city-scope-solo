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