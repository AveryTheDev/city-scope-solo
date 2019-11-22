import teleport from "../../teleport";

export const getCityBySearchTerm = async city => {
  let searchTerm = city;

  let urbanScores,
    cityImage,
    cityName,
    geoname_id,
    id_data,
    coord,
    closestCity,
    results;

  let geoname_results = {
    geoname: 0,
    urban_area: "",
    match: false
  };

  /* 
    Is used to make sure that all of the information returned from a search query
    matches the city provided.

    Without this, there will be a discrepancy in population data returned
  */

  const fromCityId = async geoname_id => {
    id_data = await teleport.get("cities/geonameid:" + geoname_id);
    return id_data;
  };

  /*
    uses the geoname id corresponding with a successful search term result to
   to present the properly formatted version of the city name
  */

  const getCityName = async id_data => {
    cityName = id_data.data["name"];
    return cityName;
  };

  /* 
    written to protect against instances when a search term initally returns a
    successful request but an inconsistency in api city name results in 
    the failed continuation of reuqests for further information
  */

  const cityMatchCheck = async geoname_id => {
    const id = geoname_id;

    const cityResults = await fromCityId(id);

    if (id === "1650527") {
      return {
        geoname: id,
        urban_area: "",
        match: true
      };
    }

    const urban_area = cityResults.data["_links"]["city:urban_area"]["name"];
    const city_returned = cityResults.data["name"];

    let check_results = {
      geoname: 0,
      urban_area: "",
      match: false
    };

    if (
      urban_area.toLowerCase() === city_returned.toLowerCase() ||
      urban_area === "San Francisco Bay Area" ||
      urban_area === "Tampa Bay Area" ||
      urban_area === "Minneapolis-Saint Paul"
    ) {
      return (check_results = {
        geoname: id,
        urban_area,
        match: true
      });
    } else {
      const urban_id = await getCityIdFromUrbanName(urban_area);

      if (urban_id === id) {
        return (check_results = {
          geoname: id,
          urban_area,
          match: true
        });
      } else {
        return (check_results = {
          geoname: id,
          urban_area,
          match: false
        });
      }
    }
  };

  /* 
    Only processes city inquires placed directly in the search bar.
    If query fails, the requests stops and a failed search page rerouting is triggered
  */

  const getCityIdFromSearchTerm = async searchTerm => {
    if (typeof searchTerm !== "string") {
      searchTerm = Object.values(searchTerm).toString();
    }

    let refinedSearchTerm = searchTerm.toLowerCase().replace(/ /g, "%20");
    if (
      refinedSearchTerm.includes("minneapolis-saint") ||
      refinedSearchTerm.includes("minneapolis")
    ) {
      return await cityMatchCheck((geoname_id = 5045360));
    }

    if (refinedSearchTerm.includes("francisco")) {
      return await cityMatchCheck((geoname_id = 5391959));
    }

    if (new RegExp("tampa").test(refinedSearchTerm)) {
      refinedSearchTerm = "tampa";
    }

    let citySearch = await teleport.get("cities/?search=" + refinedSearchTerm);

    if (citySearch.data.count === 0)
      return {
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

  /* 
    used in the instance that one of the city names provided by teleport is
    selected via one of the list items available on the landing page or 
    failed search page
  */

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

    let citySearch = await teleport.get("cities/?search=" + urban_name);

    let cityResponseURL =
      citySearch.data["_embedded"]["city:search-results"][0]["_links"][
        "city:item"
      ]["href"];

    let idSearch = /[0-9]/g;

    geoname_id = cityResponseURL.match(idSearch);
    geoname_id = geoname_id.toString().replace(/,/g, "");

    return geoname_id;
  };

  /* 
    if the urban scores are from request are valid, that endpoint is used 
    to retrieve img urls for use
  */

  const getCityImageFromUrbanScores = async urbanScores => {
    let imageURL = await teleport.get(urbanScores);
    imageURL = imageURL.data["_links"]["ua:images"]["href"];

    let cityImage = await teleport.get(imageURL);
    cityImage = cityImage.data.photos[0].image.web;

    return cityImage;
  };

  /* 
    Utilitzes geoname id or id_data (which is same format but sourced from diff functions),
    to retrieve the urban score link which provides in depth statistical information about the city
    such as housing costs, avg salary and PISA scores (education) as well as img of the city
  */

  const getCityDetailsFromId = async (geoname_id, id_data) => {
    if (geoname_id === "1650527") {
      let urbanScores = "https://api.teleport.org/api/urban_areas/slug:bali/";
      return urbanScores;
    } else {
      let urbanScores = id_data.data["_links"]["city:urban_area"]["href"];
      return urbanScores;
    }
  };

  /* to be used for future features that have been yet to be implemented */

  const getCoordFromIdData = async id_data => {
    coord = id_data.data["location"]["latlon"];
    return coord;
  };

  /* First function that runs which determines whether search term entered will
    return valid results in the api
  */

  geoname_results = await getCityIdFromSearchTerm(searchTerm);

  /* no match in database */

  if (geoname_results.geoname === 0) {
    results = {
      urbanScores: "N/A",
      geoname_id: "N/A",
      cityImage: "N/A",
      cityName: "N/A",
      coord: "N/A",
      match: true,
      chosenCity: "N/A",
      inDatabase: false
    };
    return results;
  } else if (geoname_results.match) {
    /* 
    runs in the instance that the search term is identical in format to the 
    city name in the database
  */
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
  } else {
    /* 
    Runs when the search term is similar enough to the correct pathing to 
    provide a close city match according to the api but requires additional functions 
    to make it clear to the user that Teleport's API is providing the closest city
    in its database as a result.

    Also prevents the wrong population data from being returned.
  */
    closestCity = await getCityName(await fromCityId(geoname_results.geoname));
    geoname_id = await getCityIdFromUrbanName(geoname_results.urban_area);
    id_data = await fromCityId(geoname_id);
    urbanScores = await getCityDetailsFromId(geoname_id, id_data);
    cityImage = await getCityImageFromUrbanScores(urbanScores);
    cityName = await getCityName(id_data);
    coord = await getCoordFromIdData(id_data);
  }

  results = {
    urbanScores,
    geoname_id: geoname_id,
    cityImage,
    cityName,
    coord,
    /* 
      false value will trigger a modal upon loading of city to inform user that the
      api is using information on a city close in proximity rather than their 
      specific city
     */
    match: false,
    closestCity,
    inDatabase: true
  };

  return results;
};
