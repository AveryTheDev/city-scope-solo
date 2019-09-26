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
        coord.name = cities[i];
        dataPoints.push(coord);
    }

    return dataPoints;
}