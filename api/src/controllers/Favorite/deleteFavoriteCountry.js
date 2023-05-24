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
        throw new Error('Could not delete favorite country: ' + error.message);
    };
};

module.exports = deleteFavoriteCountry;
