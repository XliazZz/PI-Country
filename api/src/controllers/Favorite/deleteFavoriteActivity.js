const { FavoriteActivity } = require('../../db');

const deleteFavoriteActivity = async (id) => {
    try {
        const favoriteFinded = await FavoriteActivity.findByPk(id);
        if(!favoriteFinded) throw new Error('Favorite activity no finded!');
        favoriteFinded.destroy();
        return 'Success';
    } catch (error) {
        throw new Error('Could not delete favorite activity: ' + error.message);
    };
};

module.exports = deleteFavoriteActivity;