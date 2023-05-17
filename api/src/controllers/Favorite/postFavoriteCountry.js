const { FavoriteCountry } = require('../../db');

const postFavoriteCountry = async (country) => {
    try {
        const newFavoriteCountry = await FavoriteCountry.create({
            id: country.id,
            name: country.name,
            flags: country.flags,
            continents: country.continents,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population
        });

        console.log(newFavoriteCountry)
        
        return newFavoriteCountry;

    } catch (error) {
        return { error: error.message };
    };
};

module.exports = postFavoriteCountry;