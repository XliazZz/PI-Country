const { Country } = require('../../db');

const getAllCountries = async () => {
    try {
        const allCountries = await Country.findAll();
        return allCountries;
    } catch (error) {
        throw new Error('Could not fetch countries: ' + error.message);
    };
};

module.exports = getAllCountries;