import teleport from "../../teleport";

export const getCityBySearchTerm = async city => {
    
    let searchTerm = city;

    let urbanScores, cityImage, cityName, geoname_id, id_data, coord, results;

        const fromCityId = async geoname_id => {
            id_data = await teleport.get(
                              "cities/geonameid:" + geoname_id
                            ); 
            return id_data;
        }

        const getCityName = async id_data => {

            cityName = id_data.data["name"]
            return cityName;
        }

        const getCityIdFromSearchTerm = async searchTerm => {
            if(typeof searchTerm !== "string") {
                searchTerm = (Object.values(searchTerm)).toString();
            }

            let refinedSearchTerm = searchTerm.toLowerCase().replace(/ /g, "%20");
            if (refinedSearchTerm.includes("minneapolis-saint") || refinedSearchTerm.includes("minneapolis")) {
              return geoname_id = 5045360;
            } 

            if (new RegExp("tampa").test(refinedSearchTerm)) {
            refinedSearchTerm = "tampa";
            }

            let citySearch = await teleport.get(
            "cities/?search=" + refinedSearchTerm
            );

            let cityResponseURL =
            citySearch.data["_embedded"]["city:search-results"][0]["_links"][
                "city:item"
            ]["href"];

            let idSearch = /[0-9]/g;

            geoname_id = cityResponseURL.match(idSearch);
            geoname_id = geoname_id.toString().replace(/,/g, "");

            return geoname_id;
        };

        const getCityImageFromUrbanScores = async urbanScores => {
            let imageURL = await teleport.get(urbanScores);
            imageURL = imageURL.data["_links"]["ua:images"]["href"];

            let cityImage = await teleport.get(imageURL);
            cityImage = cityImage.data.photos[0].image.web;

            return cityImage;
        }

        const getCityDetailsFromId = async (geoname_id, id_data) => {
            if (geoname_id === "1650527") {
                let urbanScores = "https://api.teleport.org/api/urban_areas/slug:bali/";
                
                return urbanScores;
            }

            else {
                let urbanScores = id_data.data["_links"]["city:urban_area"]["href"];
                
                return urbanScores;
            }
        };

        const getCoordFromIdData = async id_data => {
            coord = id_data.data["location"]["latlon"];

            return coord;
        }

        geoname_id = await getCityIdFromSearchTerm(searchTerm);
        id_data = await fromCityId(geoname_id);
        urbanScores = await getCityDetailsFromId(geoname_id, id_data); 
        cityImage = await getCityImageFromUrbanScores(urbanScores);
        cityName = await getCityName(id_data);
        coord = await getCoordFromIdData(id_data);

        results = {
          urbanScores,
          geoname_id,
          cityImage,
          cityName,
          coord,
          isChosen: true
        };

        return results;
};

