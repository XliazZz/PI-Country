const { FavoriteActivity } = require('../../db');

const getAllFavoritesActivities = async () => {
    try {
        const allFavoritesActivity = await FavoriteActivity.findAll();

        return allFavoritesActivity;

    } catch (error) {
        return { error: error.message }
    };
};

module.exports = getAllFavoritesActivities;