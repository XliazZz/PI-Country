const { Op } = require('sequelize');
const { Activity } = require('../../db');

const filterActivityByName = async (name) => {
    try {
        const activities = await Activity.findAll({
            where: {
                name: {
                [Op.iLike]: `%${name}%`,
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
        }
};

module.exports = filterActivityByName;