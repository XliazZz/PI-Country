const { Op } = require('sequelize');
const { Country } = require('../../db');

const getCountriesByName = async (name) => {
    try {
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%` // Búsqueda por coincidencia parcial independientemente de mayúsculas o minúsculas
                }
            }
        });
        if(countries.length === 0) {
            throw new Error(`No countries found with name: ${name}`)
        }

        return countries;

    } catch (error) {
        throw new Error(`Error searching for countries: ${error.message}`);
    }
};

module.exports = getCountriesByName;