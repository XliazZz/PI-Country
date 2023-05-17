const { FavoriteActivity } = require('../../db');

const postFavoriteActivity = async (activity) => {
    try {
        const newFavoriteActivity = await FavoriteActivity.create({
            id: activity.id,
            name: activity.name,
            difficulty: activity.difficulty,
            duration: activity.duration,
            season: activity.season
        });

        return newFavoriteActivity;

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = postFavoriteActivity;