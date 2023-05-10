const { Activity } = require('../../db');

const postActivity = async (activity) => {
    try {
        const newActivity = await Activity.create({
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season
        });

        await newActivity.addCountries(activity.countries);

        return newActivity;
    } catch (error) {
        console.error(error);
        return { error: 'Could not create the activity.' };
    }
};

module.exports = postActivity;
