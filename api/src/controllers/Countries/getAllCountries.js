const { Country } = require('../../db');

const getAllCountries = async () => {
    try {
        const allCountries = await Country.findAll();

        return allCountries;
        
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = getAllCountries