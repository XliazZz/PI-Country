const deleteFavoriteCountry = require('../../controllers/Favorite/deleteFavoriteCountry');

const deleteFavoriteCountries = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send('Invalid request. Please provide a valid country ID.');
        }

        const deleteFavoriteCountryResult = await deleteFavoriteCountry(id);

        if (deleteFavoriteCountryResult.error) {
            throw new Error(deleteFavoriteCountryResult.error);
        }

        return res.status(200).json(deleteFavoriteCountryResult);

    } catch (error) {
        console.error(error); // Imprimir el error en la consola para su posterior análisis

        res.status(404).send(error.message);
    };
};

module.exports = deleteFavoriteCountries;