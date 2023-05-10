const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllCountries = require('../controllers/Countries/getAllCountries');
const getCountriesById = require('../controllers/Countries/getCountryById')
const getCountriesByName = require('../controllers/Countries/getCountriesByName');
const postActivity = require('../controllers/Activity/postActivity');
const getAllActivities = require('../controllers/Activity/getAllActivities');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', async (req, res) => {
    try {
        const allCountries = await getAllCountries();

        res.status(200).json(allCountries)

    } catch (error) {
        res.status(404).send("Error when getting the countries.")
    }
})

router.get('/countries/byId/:idPais', async (req, res) => {
    try {
        const id = req.params.idPais;

        const country = await getCountriesById(id);

        if(country.error) throw new Error(country.error)

        return res.status(200).json(country)

    } catch (error) {
        return res.status(404).send(error.message)
    }
})

router.get('/countries/byName', async (req, res) => {
    try {
        const { name } = req.query;

        const countries = await getCountriesByName(name);

        res.status(200).json(countries);
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/activity', async (req, res) => {
    try {
        const activity = await postActivity(req.body);

        if(activity.error) throw new Error(activity.error);

        res.status(200).json(activity);
    } catch (error) {
        return res.status(404).send(error.message)
    };
});

router.get('/activities', async (req, res) => {
    try {
        const allActivities = await getAllActivities();

        res.status(200).json(allActivities)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;