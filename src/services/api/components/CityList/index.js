import teleport from '../../teleport';

export const fetchCities = async () => {
    const cityList = await teleport.get('urban_areas/');
    const cityListLinks = cityList.data['_links']['ua:item'];

    const cityOptionsList = cityListLinks.map(x => x.name);

    return cityOptionsList;
}
