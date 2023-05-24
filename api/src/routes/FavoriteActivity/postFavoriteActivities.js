const postFavoriteActivity = require('../../controllers/Favorite/postFavoriteActivity');

const postFavoriteActivities = async (req, res) => {
    try {
        const activityFav = await postFavoriteActivity(req.body);

        if(activityFav.error) throw new Error(activityFav.error);

        res.status(200).json(activityFav);

    } catch (error) {
        return res.status(404).send(error.message);
    };
};

module.exports = postFavoriteActivities;