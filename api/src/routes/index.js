const { Router } = require('express');
const path = require('path');
const router = Router();

const getCountries = require('../routes/Countries/getCountries');
const getCountriesId = require('../routes/Countries/getCountriesId');
const getCountriesName = require('../routes/Countries/getCountriesName');
const getContinents = require('../routes/Countries/getContinents');

const getActivities = require('../routes/Activities/getActivities');
const getActivitiesSeason = require('./Activities/getActivitiesSeason');
const postActivities = require('../routes/Activities/postActivities');
const getActivityCountry = require('../routes/Activities/getActivityCountry');

const postFavoriteCountries = require('../routes/FavoriteCountry/postFavoriteCountries');
const getFavoriteCountries = require('../routes/FavoriteCountry/getFavoriteCountries');
const deleteFavoriteCountries = require('../routes/FavoriteCountry/deleteFavoriteCountries');

const postFavoriteActivities = require('../routes/FavoriteActivity/postFavoriteActivities');
const getFavoriteActivities = require('../routes/FavoriteActivity/getFavoriteActivities');
const deleteFavoriteActivities = require('../routes/FavoriteActivity/deleteFavoriteActivities');

const { upload } = require('../controllers/UploadImage/uploadImage');
const createUsers = require('../routes/User/createUsers');
const logins = require('../routes/User/logins');

const postMessages = require('../routes/Message/postMessages');

//Rutas
router.get('/countries', getCountries);
router.get('/countries/byId/:idPais', getCountriesId);
router.get('/countries/byName', getCountriesName);
router.get('/continents', getContinents);

router.get('/activities', getActivities);
router.get('/activities', getActivitiesSeason);
router.post('/activity', postActivities);

router.get('/fav', getFavoriteCountries);
router.post('/fav', postFavoriteCountries);
router.delete('/fav/:id', deleteFavoriteCountries);

router.get('/favactivity', getFavoriteActivities);
router.post('/favactivity', postFavoriteActivities);
router.delete('/favactivity/:id', deleteFavoriteActivities);

router.get('/login', logins);
router.post('/user', upload , createUsers);

router.post('/messages', postMessages);

router.get('/activity/:id/countries', getActivityCountry);

module.exports = router;