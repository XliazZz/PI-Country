const { Activity, Country } = require('../../db');

const postActivity = async (activity) => {
    try {
        const newActivity = await Activity.create({
            name: activity.name,
            difficulty: activity.difficulty,
            duration: activity.duration,
            season: activity.season,
        });
        // Obtener los objetos Country correspondientes a los ids enviados desde el front
        const countries = await Country.findAll({
            where: {
            id: activity.selectedCountries?.map((country) => country.id),
            },
        });
        // Asociar los países con la nueva actividad en la tabla intermedia
        await newActivity.setCountries(countries);
        return newActivity;
    } catch (error) {
        throw new Error('Could not create the activity.');
    };
};

module.exports = postActivity;