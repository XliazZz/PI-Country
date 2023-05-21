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
const { upload } = require('../controllers/UploadImage/uploadImage');
const getAllFavoritesCountries = require('../controllers/Favorite/getAllFavoritesCountries');
const deleteFavoriteCountry = require('../controllers/Favorite/deleteFavoriteCountry');
const getAllFavoritesActivities = require('../controllers/Favorite/getAllFavoriteActivities');

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
        console.log(allActivities)
        res.status(200).json(allActivities)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/activities', async (req, res) => {
    try {
        const season = req.query.season; // Obtener la temporada desde la consulta
        const activities = await filterActivityByName(season); // Utilizar la función filterActivityBySeason
        res.status(200).json(activities);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


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

router.get('/fav', async (req, res) => {
    try {
        const allCountriesFav = await getAllFavoritesCountries();

        res.status(200).json(allCountriesFav);

    } catch (error) {
        res.status(404).send("Error when getting the countries favs.")
    }
})

router.delete('/fav/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send('Invalid request. Please provide a valid country ID.');
        }

        const deleteFavoriteCountryResult = await deleteFavoriteCountry(id);

        if (deleteFavoriteCountryResult.error) {
            throw new Error(deleteFavoriteCountryResult.error);
        }

        return res.status(200).json(deleteFavoriteCountryResult);

    } catch (error) {
        console.error(error); // Imprimir el error en la consola para su posterior análisis

        return res.status(500).send('An error occurred while deleting the Favorite Country.');
    }
});


router.post('/favactivity', async (req, res) => {
    try {
        const activityFav = await postFavoriteActivity(req.body);

        if(activityFav.error) throw new Error(activityFav.error);

        res.status(200).json(activityFav);

    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.delete('/favactivity/:id', async (req, res) => {
    try {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).send('Invalid request. Please provide a valid activity ID.');
        }

        const deleteFavoriteActivities = await deleteFavoriteActivity(id);

        if (deleteFavoriteActivities.error) {
            throw new Error(deleteFavoriteActivities.error);
        }

        return res.status(200).json(deleteFavoriteActivities);

    } catch (error) {
        console.error(error); // Imprimir el error en la consola para su posterior análisis

        return res.status(500).send('An error occurred while deleting the Favorite Activity.');    
    }
})

router.get('/favactivity', async (req, res) => {
    try {
        const allActivitiesFav = await getAllFavoritesActivities();

        res.status(200).json(allActivitiesFav);

    } catch (error) {
        res.status(404).send("Error when getting the activities favs.")
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
