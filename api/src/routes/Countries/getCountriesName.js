const getCountriesByName = require('../../controllers/Countries/getCountriesByName');

const getCountriesName = async (req, res) => {
    try {
        const { name } = req.query;
        const countries = await getCountriesByName(name);
        res.status(200).json(countries);
    } catch (error) {
        res.status(404).send(error.message)
    };
};

module.exports = getCountriesName;