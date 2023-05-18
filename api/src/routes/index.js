const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const path = require('path');
const getAllCountries = require('../controllers/Countries/getAllCountries');
const getCountriesById = require('../controllers/Countries/getCountryById')
const getCountriesByName = require('../controllers/Countries/getCountriesByName');
const postActivity = require('../controllers/Activity/postActivity');
const getAllActivities = require('../controllers/Activity/getAllActivities');
const listContinents  = require('../controllers/Countries/listContinents');
const filterActivityByName = require('../controllers/Activity/filterActivityByName');
const postFavoriteCountry = require('../controllers/Favorite/postFavoriteCountry');
const postFavoriteActivity = require('../controllers/Favorite/postFavoriteActivity');
const deleteFavoriteActivity = require('../controllers/Favorite/deleteFavoriteActivity');
const createUser = require('../controllers/User/createUser');
const login = require('../controllers/User/login');
const { upload } = require('../controllers/UploadImage/uploadImage')

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
        // console.log(activity)
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
        res.status(404).send(error.message);
    };
});

router.post('/fav', async (req, res) => {
    try {
        const { id, name, flags, continents, capital, subregion, area, population} = req.body;

        const countryFav = await postFavoriteCountry({ id, name, flags, continents, capital, subregion, area, population });

        
        res.status(200).json(countryFav);

    } catch (error) {
        console.error('Error in /fav route:', error);
        res.status(500).send('Internal Server Error');    
    };
});

router.delete('/fav/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteFavoriteCountry = await deleteFavoriteCountry(id);

        if(deleteFavoriteCountry.error) throw new Error(deleteFavoriteCountry.error);

        return res.status(200).json(deleteFavoriteCountry);

    } catch (error) {
        return res.status(404).send(error.message);
    }
});

router.post('/favActivity', async (req, res) => {
    try {
        const activityFav = await postFavoriteActivity(req.body);

        if(activityFav.error) throw new Error(activityFav.error);

        res.status(200).json(activityFav);

    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.delete('/favActivity/:id', async (req, res) => {
    try {
        const { id } = req.params; 

        const deleteFavoriteActivities = await deleteFavoriteActivity(id);

        if(deleteFavoriteActivities.error) throw new Error(deleteFavoriteActivities.error);

        return res.status(200).json(deleteFavoriteActivities);

    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.post('/user', upload ,async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const image = req.file && req.file.path;

        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({ message: 'Missing data' })
        }

        const newUser = await createUser({ email, password, firstName, lastName, image });
        
        return res.status(200).json(newUser);
        
    } catch (error) {
        console.log(error)
        return res.status(404).send(error.message)
    }
})

router.get('/login', async (req, res) => {
    try {
        const { email, password } = req.query;
        
        const user = await login(email, password);

        return res.status(200).json({ access: true });

    } catch (error) {
        return res.status(404).send(error.message)
    }
});

module.exports = router;
