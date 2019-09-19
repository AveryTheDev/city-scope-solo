import teleport from "../../teleport";

export const getCityBySearchTerm = async city => {
    
    let searchTerm = city;

    let urbanScores, cityImage, cityName, geoname_id, results;

        const getCityNameFromSearchTerm = (searchTerm) => {
            if (typeof searchTerm !== "string") {
                searchTerm = Object.values(searchTerm).toString();
            }

            cityName  = searchTerm
              .toLowerCase()
              .split(" ")
              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ");;

            if (
              cityName === "Washington, D.c." ||
              cityName === "Washington D.c." ||
              cityName === "Washington Dc" ||
              cityName === "Washington, D.c."
            ) {
              cityName = "Washington, D.C.";
              return cityName;
            }

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

        const getCityImageFromUrbanScores = async (urbanScores) => {
            let imageURL = await teleport.get(urbanScores);
            imageURL = imageURL.data["_links"]["ua:images"]["href"];

            let cityImage = await teleport.get(imageURL);
            cityImage = cityImage.data.photos[0].image.web;

            return cityImage;
        }

        const getCityDetailsFromId = async geoname_id => {
            if (geoname_id === "1650527") {
                let urbanScores = "https://api.teleport.org/api/urban_areas/slug:bali/";
                
                return urbanScores;
            }

            else {
                let urbanScores = await teleport.get("cities/geonameid:" + geoname_id);
                urbanScores = urbanScores.data["_links"]["city:urban_area"]["href"];
                
                return urbanScores;
            }
        };

        geoname_id = await getCityIdFromSearchTerm(searchTerm);
        urbanScores = await getCityDetailsFromId(geoname_id);
        cityImage = await getCityImageFromUrbanScores(urbanScores);
        cityName = getCityNameFromSearchTerm(searchTerm);

        results = {
          urbanScores,
          geoname_id,
          cityImage,
          cityName,
          isChosen: true
        };

        return results;
};

