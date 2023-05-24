const { FavoriteCountry } = require('../../db');

const getAllFavoritesCountries = async () => {
    try {
        const allFavoritesCountries = await FavoriteCountry.findAll();
        return allFavoritesCountries;
    } catch (error) {
        throw new Error('Could not retrieve favorite countries: ' + error.message);
    };
};

module.exports = getAllFavoritesCountries;