import teleport from '../../../teleport';

export const fetchGlobalSafety = async () => {

    let gunsOwnedList, fatalitiesList, cityList;
    let globalSafetyData = {
      cities: [],
      guns: [],
      deaths: []
    };

    const getNameFromLink = async cityList => {
      const beforeCity = /(.+slug:)/;
      const afterCity = /\/details\//;

      let cityNames = cityList;

      let refinedName = cityNames.map(name => (name.replace(beforeCity, "")).replace(afterCity, ""));

      return refinedName;
    };

    const getGunList = async cityCrimeList => {
      gunsOwnedList = cityCrimeList.map(x => x[0].data[3].int_value);
      
      return gunsOwnedList;
  }

    const getFatalitiesList = async cityCrimeList => {
      fatalitiesList = cityCrimeList.map(x => x[0].data[1].int_value);

      return fatalitiesList;
    }

    const fetchSafety = async () => {
      let cityNameList = await teleport.get("urban_areas/");
      cityNameList = cityNameList.data["_links"]["ua:item"];
      cityNameList = cityNameList.map(x => x.href);

      let compareCity = await Promise.all(
        cityNameList.map(async x => teleport.get(x))
      );

      compareCity = compareCity.map(
        x => x.data["_links"]["ua:details"]["href"]
      );

      const cityCategoriesList = await Promise.all(
        compareCity.map(async x => teleport.get(x))
      );

      const cityCrimeList = cityCategoriesList.map(x => { return x.data.categories.filter(
          category => category.id.toUpperCase() === "SAFETY"
        )});

      gunsOwnedList = await getGunList(cityCrimeList);
      fatalitiesList = await getFatalitiesList(cityCrimeList);
      cityList = await getNameFromLink(compareCity);

      globalSafetyData.cities = cityList;
      globalSafetyData.guns = gunsOwnedList
      globalSafetyData.deaths = fatalitiesList;

      if(globalSafetyData)  return globalSafetyData;
      else return;
    };

    globalSafetyData = await fetchSafety();
    return globalSafetyData;
}