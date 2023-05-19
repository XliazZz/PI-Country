const { FavoriteCountry } = require('../../db');

const getAllFavoritesCountries = async () => {
    try {
        const allFavoritesCountries = await FavoriteCountry.findAll();

        return allFavoritesCountries;

    } catch (error) {
        return { error: error.message }
    };
};

module.exports = getAllFavoritesCountries;