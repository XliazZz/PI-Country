const { Country } = require('../../db');
const { conn } = require('../../db');


const listContinents = async () => {
    try {
        const continents = await Country.findAll({
            attributes: [[conn.fn('DISTINCT', conn.col('continents')), 'continent']]
        });

        const continentValues = continents.map(continent => continent.get('continent'));

        return continentValues;

    } catch (error) {
        throw new Error(`Error searching for continent: ${error.message}`);
    }
};


module.exports = listContinents;