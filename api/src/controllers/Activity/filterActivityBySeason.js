const { Op } = require('sequelize');
const { Activity } = require('../../db');

const filterActivityBySeason = async (season) => {
    try {
        const activities = await Activity.findAll({
            where: {
                season: {
                [Op.eq]: season,
                },
            },
            include: [
                {
                model: Country,
                attributes: ['id', 'name'],
                through: {
                    attributes: [],
                },
                },
            ],
            });
        return activities;
    } catch (error) {
        throw new Error(`Error searching for activities: ${error.message}`);
    };
};

module.exports = filterActivityBySeason;