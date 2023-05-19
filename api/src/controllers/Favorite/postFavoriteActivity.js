const { FavoriteActivity, User } = require('../../db');

const postFavoriteActivity = async (activity) => {
    try {
        const newFavoriteActivity = await FavoriteActivity.create({
            id: activity.id,
            name: activity.name,
            difficulty: activity.difficulty,
            duration: activity.duration,
            season: activity.season
        });

        // Asociar el FavoriteCountry al User
        const user = await User.findOne(); // Obtiene un usuario existente (puedes adaptarlo según tus necesidades)
        await user.addFavoriteActivity(newFavoriteActivity);

        return newFavoriteActivity;

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = postFavoriteActivity;