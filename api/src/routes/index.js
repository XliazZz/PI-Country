const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllCountries = require('../controllers/Countries/getAllCountries');
const getCountriesById = require('../controllers/Countries/getCountryById')
const getCountriesByName = require('../controllers/Countries/getCountriesByName');
const postActivity = require('../controllers/Activity/postActivity');
const getAllActivities = require('../controllers/Activity/getAllActivities');
const listContinents  = require('../controllers/Countries/listContinents');
const filterActivityByName = require('../controllers/Activity/filterActivityByName');
const listName = require('../controllers/Countries/listName');

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

router.get('/activities', async (req, res) => {
    try {
        const name = req.query.name;
        const activities = await filterActivityByName(name)
        res.status(200).json(activities);    
    } catch (error) {
        res.status(404).send(error.message)
    }

})

router.get('/continents', async (req, res) => {
    try {
        const continents = await listContinents();
        console.log(continents)
        res.status(200).json(continents);
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/countries/name', async (req, res) => {
    try {
        const names = await listName();
        console.log(names)
        res.status(200).json(names)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;
