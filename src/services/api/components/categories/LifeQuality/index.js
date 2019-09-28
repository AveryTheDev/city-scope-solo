import teleport from '../../../teleport';

export const fetchLifeQualityScores = async urbanScores => {
    const city = urbanScores;

    const fetchCategories = async city => {
        const desiredCategories = ["HOUSING", "COST OF LIVING", "SAFETY", "HEALTHCARE", "EDUCATION", "ECONOMY"];

        let cityData = await teleport.get(city);
        cityData = cityData.data["_links"]["ua:scores"]["href"];

        let categories = await teleport.get(cityData);
        categories = categories.data["categories"];

        const categoriesShown = categories.filter( x => desiredCategories.includes((x.name).toUpperCase()));

        return categoriesShown;
    }

    const fetchCategoryScores = async categories => {

        const listOfScores = categories.map(x => x["score_out_of_10"])
        const categoryNames = categories.map(x => x["name"])
        const scoreColors = categories.map(x => x["color"])

        let scoreFormat = {
            score: 0,
            category: '',
            color: ''
        }

        let scoreData = [];

        for(let i = 0; i < categoryNames.length; i++) {
            let data = Object.create(scoreFormat)
            data.score = listOfScores[i].toPrecision(2);

            if(listOfScores[i] < 1) {
                data.score = listOfScores[i].toPrecision(1);
            }

            data.name = categoryNames[i];
            data.color = scoreColors[i];

            scoreData.push(data);
        }

        return scoreData;
    } 

        const scores = await fetchCategoryScores(await fetchCategories(city));

        return scores;
}