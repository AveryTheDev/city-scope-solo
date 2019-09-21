import teleport from '../../../teleport';

export const fetchCityDescription = async (city_urbanScores) => {
    const urbanScores = city_urbanScores;

    const urbanInfo = await teleport.get(urbanScores);
    const urbanInfoURL = urbanInfo.data["_links"]["ua:scores"]["href"];
    const urbanSummaryPage = await teleport.get(urbanInfoURL);
    const urbanSummary = urbanSummaryPage.data["summary"];

    return urbanSummary;
}