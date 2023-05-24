const getAllFavoritesActivities = require('../../controllers/Favorite/getAllFavoriteActivities');

const getFavoriteActivities = async (req, res) => {
    try {
        const allActivitiesFav = await getAllFavoritesActivities();

        res.status(200).json(allActivitiesFav);

    } catch (error) {
        res.status(404).send(error.message);
    };
};

module.exports = getFavoriteActivities