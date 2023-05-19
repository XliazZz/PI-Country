const { FavoriteCountry } = require('../../db');

const deleteFavoriteCountry = async (id) => {
    try {
        const favoriteFinded = await FavoriteCountry.findByPk(id);

        if (!favoriteFinded) {
            throw new Error('Favorite Country not found!');
        }

        await favoriteFinded.destroy();

        return 'Success';
    } catch (error) {
        console.error(error); // Imprimir el error en la consola para su posterior análisis

        return { error: 'An error occurred while deleting the Favorite Country.' };
    }
};

module.exports = deleteFavoriteCountry;
