import teleport from '../../teleport';

export const fetchCities = async () => {
    const cityList = await teleport.get('urban_areas/');
    const cityListLinks = cityList.data['_links']['ua:item'];

    const cityNamesList = (cityListLinks.map(x => x.name)).filter(city => city !== "Valencia");

    return cityNamesList;
}

export const fetchCitiesWithContinent = async () => {

  const fetchContinents = async () => {
    const continents = await teleport.get("continents/")
    const continentData = continents.data["_links"][
      "continent:items"
    ];

    let continentsWithCities = {};

    for (let continent of continentData) {
      if (continent['name'] !== "Antarctica") {
        continentsWithCities[continent['name']] = continent["href"];
      }
    }

    return continentsWithCities;
  };

  const fetchCities = async continentsWithCities => {
    const continents = continentsWithCities;

    const listOfLinks = Object.values(continents);

    const getCities = async x => {
        const reg = /continents\/?.*/g;  
        
        const continent = x;
        const continentUrban = (continent.match(reg).join('')+'urban_areas/');
        let cityObjects = await teleport.get(continentUrban);
        cityObjects = cityObjects.data["_links"]["ua:items"];
        return cityObjects.map(x => x.name);
    };

    const arrayOfCitiesPerContinent = async links => {

      const citiesPerContinent = await Promise.all(
        links.map(x => {
          return (x = getCities(x));
        })
      ); 

      return Object.values(citiesPerContinent);
    };

    const cityArray = await arrayOfCitiesPerContinent(listOfLinks);
    let counter = 0;

    for(let region in continents) {
        continents[region] = cityArray[counter];
        counter++;
    }

    return continents;
  };

    const continents = await fetchContinents()
    return await fetchCities(continents);
};