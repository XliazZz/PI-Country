const { Activity } = require('../../db');

const getAllActivities = async () => {
    try {
        const allActivities = await Activity.findAll();

        return allActivities;
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = getAllActivities;