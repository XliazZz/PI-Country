const getAllActivities = require('../../controllers/Activity/getAllActivities');

const getActivities = async (req, res) => {
    try {
        const allActivities = await getAllActivities();
        console.log(allActivities)
        res.status(200).json(allActivities)
    } catch (error) {
        res.status(404).send(error.message)
    };
};

module.exports = getActivities;