const getAllCountries = require('../../controllers/Countries/getAllCountries');

const getCountries = async (req, res) => {
    try {
        const allCountries = await getAllCountries();
        res.status(200).json(allCountries)
    } catch (error) {
        res.status(404).send(error.message);
    };
};

module.exports = getCountries;