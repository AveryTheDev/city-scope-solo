import {refineName} from '../../../../../../services/utils'
import teleport from '../../../../../../services/api/teleport';

export const formatData = async globalStats => {

    let guns = globalStats.guns;
    let deaths = globalStats.deaths;    
    let cities = globalStats.cities;

    const coordinate = {
        x: 0,
        y: 0,
        name: ''
    }
    let dataPoints = [];

    const stringToFloat = (x) => {
        return x = parseFloat(x);
    }

    const valueOfX = guns.map(x => {
        return x = stringToFloat(x);
    })

    const valueOfY = deaths.map(x => {
        return x = stringToFloat(x);
    })

    for (let i = 0; i < valueOfX.length; i++) {
        let coord = Object.create(coordinate);
        coord.x = valueOfX[i];
        coord.y = valueOfY[i];
        coord.name = await refineName(cities[i]);
        dataPoints.push(coord);
    }

    return dataPoints;
}

export const fetchCitySafety = async urbanScores => {
    const city = urbanScores;

    let cityData = await teleport.get(city);
    cityData = cityData.data["_links"]["ua:details"]["href"];

    const cityCategories = await teleport.get(cityData);
    const citySafety = cityCategories.data.categories.find(
        category => category.id.toUpperCase() === "SAFETY"
    );

    const guns = citySafety.data[3]["int_value"];
    const deaths = citySafety.data[1]["int_value"];

    const citySafetyStats = {
        guns,
        deaths
    }

    return citySafetyStats;
}