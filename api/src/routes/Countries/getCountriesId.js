const getCountriesById = require('../../controllers/Countries/getCountryById');

const getCountriesId = async (req, res) => {
    try {
        const id = req.params.idPais;
        const country = await getCountriesById(id);
        if(country.error) throw new Error(country.error)
        return res.status(200).json(country)
    } catch (error) {
        return res.status(404).send(error.message)
    };
};

module.exports = getCountriesId;