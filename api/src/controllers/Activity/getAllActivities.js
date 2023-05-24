const { Activity } = require('../../db');

const getAllActivities = async () => {
    try {
        const allActivities = await Activity.findAll();
        return allActivities;
    } catch (error) {
        throw new Error('Could not fetch activities.'); 
    };
};

module.exports = getAllActivities;