const filterActivityBySeason = require('../../controllers/Activity/filterActivityBySeason');

const getActivitiesSeason = async (req, res) => {
    try {
        const season = req.query.season; // Obtener la temporada desde la consulta
        const activities = await filterActivityBySeason(season); // Utilizar la función filterActivityBySeason
        res.status(200).json(activities);
    } catch (error) {
        res.status(404).send(error.message);
    };
};

module.exports = getActivitiesSeason;