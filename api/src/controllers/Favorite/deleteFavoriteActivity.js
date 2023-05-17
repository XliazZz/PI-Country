const { FavoriteActivity } = require('../../db');

const deleteFavoriteActivity = async (id) => {
    try {
        const favoriteFinded = await FavoriteActivity.findByPk(id);

        if(!favoriteFinded) throw new Error('Favorite activity no finded!');

        favoriteFinded.destroy();

        return 'Success';

    } catch (error) {
        return { error: error.message }
    };
};

module.exports = deleteFavoriteActivity;