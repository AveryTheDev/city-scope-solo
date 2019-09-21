import teleport from '../../../teleport';

export const fetchLifeQualityScores = async urbanScores => {
    const city = urbanScores;

    let categories, scores;

    const fetchCategories = async city => {
        let cityData = await teleport.get(city);
        cityData = cityData.data["_links"]["ua:scores"]["href"];

        let categories = await teleport.get(cityData);
        categories = categories.data["categories"];

        return categories;
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

        categories = await fetchCategories(city);
        scores = await fetchCategoryScores(categories);


        return scores;
}