const postFavoriteCountry = require('../../controllers/Favorite/postFavoriteCountry');

const postFavoriteCountries = async (req, res) => {
    try {
        const { id, name, flags, continents, capital, subregion, area, population} = req.body;

        const countryFav = await postFavoriteCountry({ id, name, flags, continents, capital, subregion, area, population });

        
        res.status(200).json(countryFav);

    } catch (error) {
        console.error('Error in /fav route:', error);
        res.status(404).send(error.message);
    };
};

module.exports = postFavoriteCountries;