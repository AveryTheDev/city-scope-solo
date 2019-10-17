import teleport from "../../teleport";

export const getCityBySearchTerm = async city => {
    
    let searchTerm = city;

    let urbanScores, cityImage, cityName, geoname_id, id_data, coord, closestCity, results;
    let geoname_results = {
        geoname: 0,
        urban_area: '',
        match: false
    }

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

        const cityMatchCheck = async geoname_id => {
            const id = geoname_id;

            const cityResults = await fromCityId(id);

            if(id === '1650527') {
                return {
                    geoname: id,
                    urban_area: '',
                    match: true
                }
            }

            const urban_area = cityResults.data["_links"]["city:urban_area"]["name"];
            const city_returned = cityResults.data["name"];

             let check_results = {
               geoname: 0,
               urban_area: "",
               match: false
             };

            if(urban_area.toLowerCase() === city_returned.toLowerCase()) {
                return check_results = {
                    geoname: id,
                    urban_area,
                    match: true
                }
            }
            else {

                const urban_id = await getCityIdFromUrbanName(urban_area);

                if(urban_id === id) {
                    return (check_results = {
                        geoname: id,
                        urban_area,
                        match: true
                    });
                }
                else {
                    return check_results = {
                        geoname: id,
                        urban_area,
                        match: false
                    }                    
                }
            }
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

            if(citySearch.data.count === 0) return {
                                              geoname: 0,
                                              urban_area: "",
                                              match: false
                                            };
            else {
                let cityResponseURL =
                citySearch.data["_embedded"]["city:search-results"][0]["_links"][
                    "city:item"
                ]["href"];

                let idSearch = /[0-9]/g;

                geoname_id = cityResponseURL.match(idSearch);
                geoname_id = geoname_id.toString().replace(/,/g, "");

                return await cityMatchCheck(geoname_id);           
            }
        };

        const getCityIdFromUrbanName = async urban_name => {

            if (
              urban_name.includes("minneapolis-saint") ||
              urban_name.includes("minneapolis")
            ) {
              return (geoname_id = 5045360);
            }

            if (new RegExp("tampa").test(urban_name)) {
              urban_name = "tampa";
            }

            let citySearch = await teleport.get(
                "cities/?search=" + urban_name
            );

            let cityResponseURL =
                citySearch.data["_embedded"][
                "city:search-results"
                ][0]["_links"]["city:item"]["href"];

            let idSearch = /[0-9]/g;

            geoname_id = cityResponseURL.match(idSearch);
            geoname_id = geoname_id
                .toString()
                .replace(/,/g, "");

            return geoname_id;
        }

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

        geoname_results = await getCityIdFromSearchTerm(searchTerm);

        if(geoname_results.geoname === 0) {
            results = {
            urbanScores: 'N/A',
            geoname_id: 'N/A',
            cityImage: 'N/A',
            cityName: 'N/A',
            coord: 'N/A',
            match: true,
            chosenCity: 'N/A',
            inDatabase: false
            }
            return results;
        }
        else if (geoname_results.match) {
            id_data = await fromCityId(geoname_results.geoname);
            urbanScores = await getCityDetailsFromId(geoname_results.geoname, id_data);
            cityImage = await getCityImageFromUrbanScores(urbanScores);
            cityName = await getCityName(id_data);
            coord = await getCoordFromIdData(id_data);

            results = {
              urbanScores,
              geoname_id: geoname_results.geoname,
              cityImage,
              cityName,
              coord,
              match: true,
              closestCity: geoname_results.urban_area,
              inDatabase: true
            };

            return results; 
        }
        else {
            closestCity = await getCityName(await fromCityId(geoname_results.geoname));
            geoname_id = await getCityIdFromUrbanName(
              geoname_results.urban_area
            );
            id_data = await fromCityId(geoname_id);
            urbanScores = await getCityDetailsFromId(
                geoname_id,
                id_data
            );
            cityImage = await getCityImageFromUrbanScores(
                urbanScores
            );
            cityName = await getCityName(id_data);
            coord = await getCoordFromIdData(id_data);
        }

        results = {
            urbanScores,
            geoname_id: geoname_id,
            cityImage,
            cityName,
            coord,
            match: false,
            closestCity,
            inDatabase: true
        };

        return results; 
};

