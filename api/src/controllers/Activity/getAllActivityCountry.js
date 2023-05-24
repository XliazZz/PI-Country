const { Activity } = require('../../db');

const getActivityCountry = async (id) => {
    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
        throw new Error('Activity not found');
        }
        return activity;
    } catch (error) {
        throw new Error('Server error');
    }
};

module.exports = getActivityCountry;