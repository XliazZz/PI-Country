const { FavoriteActivity } = require('../../db');

const getAllFavoritesActivities = async () => {
    try {
        const allFavoritesActivity = await FavoriteActivity.findAll();
        return allFavoritesActivity;
    } catch (error) {
        throw new Error('Could not retrieve favorite activities: ' + error.message);
    };
};

module.exports = getAllFavoritesActivities;