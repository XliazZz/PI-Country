const listContinents = require('../../controllers/Countries/listContinents');

const getContinents = async (req, res) => {
    try {
        const continents = await listContinents();
        console.log(continents)
        res.status(200).json(continents);
    } catch (error) {
        res.status(404).send(error.message);
    };
};

module.exports = getContinents;