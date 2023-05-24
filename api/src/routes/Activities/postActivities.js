const postActivity = require('../../controllers/Activity/postActivity');

const postActivities = async (req, res) => {
    try {
        const activity = await postActivity(req.body);
        if(activity.error) throw new Error(activity.error);
        res.status(200).json(activity);
    } catch (error) {
        return res.status(404).send(error.message)
    };
};

module.exports = postActivities;