const getAllActivityCountry = require('../../controllers/Activity/getAllActivityCountry');

const getActivityCountry = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await getAllActivityCountry(id);
        const countries = await activity.getCountries();
        res.status(200).json(countries);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = getActivityCountry;