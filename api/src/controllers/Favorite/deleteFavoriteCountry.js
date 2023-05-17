const { FavoriteCountry } = require('../../db');

const deleteFavoriteCountry = async (id) => {
    try {
        const favoriteFinded = await FavoriteCountry.findByPk(id);

        if(!favoriteFinded) throw new Error('Favorite Country no finded!');

        favoriteFinded.destroy();

        return 'Success';
        
    } catch (error) {
        return { error: error.message }
    };
};

module.exports = deleteFavoriteCountry;