const getAllFavoritesCountries = require('../../controllers/Favorite/getAllFavoritesCountries');

const getFavoriteCountries = async (req, res) => {
    try {
        const allCountriesFav = await getAllFavoritesCountries();

        res.status(200).json(allCountriesFav);

    } catch (error) {
        res.status(404).send(error.message);
    };
};

module.exports = getFavoriteCountries;