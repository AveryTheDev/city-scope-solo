import teleport from '../../teleport';

export const getCityByLink = async city => {
        const linkFromCity = city;

        let urbanScores, cityDetails, cityImage, cityName, geoname_id, results;

        const getCityNameFromLink = linkFromCity => {
            const afterThisTerm = ":slug";
            const cityName = linkFromCity.substr(
                linkFromCity.indexOf(afterThisTerm) + afterThisTerm.length
            );

            return cityName;
        };

        urbanScores = linkFromCity;
        cityDetails = await teleport.get(urbanScores);

        const getCityIdFromCityDetails = async cityDetails => {
            let linkToId =
                cityDetails.data["_links"]["ua:admin1-divisions"][0]["href"];
            let geoname_id = await teleport.get(linkToId);
            geoname_id = geoname_id.data["geoname_id"];

            return geoname_id;
        };

        const getCityImageFromCityDetails = async cityDetails => {
            let imageURL = cityDetails.data["_links"]["ua:images"]["href"];

            let cityImage = await teleport.get(imageURL);
            cityImage = cityImage.data.photos[0].image.web;

            return cityImage;
        };

        // linkToId = cityDetails.data["_links"]["ua:admin1-divisions"][0]["href"];
        // geoname_id = await teleport.get(linkToId);
        // geoname_id = geoname_id.data["geoname_id"];

        // let imageURL = cityDetails.data["_links"]["ua:images"]["href"];

        // let cityImage = await teleport.get(imageURL);
        // cityImage = cityImage.data.photos[0].image.web;

        // const afterThisTerm = ":slug";
        // const cityName = linkFromCity.substr(linkFromCity.indexOf(afterThisTerm) + afterThisTerm.length);

        geoname_id = getCityIdFromCityDetails(cityDetails);
        cityImage = getCityImageFromCityDetails(cityDetails);
        cityName = getCityNameFromLink(linkFromCity);

        results = {
            urbanScores,
            geoname_id,
            cityImage,
            cityName
        };

        return results;
}