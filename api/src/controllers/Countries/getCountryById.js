const { Country } = require('../../db');
const { Activity } = require('../../db');

const getCountriesById = async (idPais) =>  {
    try {
        const country = await Country.findOne({
            where: { id: idPais },
            include: {
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through: {
                attributes: [],
            }
            }
        });
    
        if (!country) {
            throw new Error(`Country with id ${idPais} not found`);
        }
    
        return country;

        } catch(error) {
        return { error: error.message }
    }
}
module.exports = getCountriesById;