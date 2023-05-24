const axios = require('axios')
const { Country } = require('../../db');
const { Activity } = require('../../db');

const countries = async function() {
    try {
        const api = await axios('https://rest-countries.up.railway.app/v3/all'); 
        if (!api.data || api.data.length === 0) {
            throw new Error('No countries were found in the API response.');
        }
        const promises = api.data.map(async element => {
            try {
            const [country, created] = await Country.findOrCreate({
                where:{
                id: element.cca3,
                name: element.name['common'],
                flags: element.flags[0],
                continents: element.continents[0],
                capital: element.capital !== undefined ? element.capital[0] : 'Capital not defined.',
                subregion: element.subregion !== undefined ? element.subregion : 'Subregion not defined.',
                area: element.area,
                population: element.population,
                },
                row: false
            });
            console.log(`Country ${created ? 'created' : 'updated'}: ${country.name}`);
            return country;
            } catch (error) {
            throw new Error(`Error processing country ${element.cca3}: ${error.message}`);
            }
        });
        let results = await Promise.all(promises);
        let allCountries = [];
        results.map(cou => { allCountries = allCountries.concat(cou) })
        return allCountries;
    } catch (error) {
        throw new Error(`Error getting countries: ${error.message}`);
    };
};

const getCountriesApi = async function() {
    try{
        const countriesData = await countries()
        const getCountries = await Country.findAll({ 
            attributes: ['id', 'name', 'flags', 'continents', "population"],
            include: {
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }
        })
        return getCountries
    } catch(error){
        throw new Error('Could not fetch countries: ' + error.message);
    };
};


module.exports = {
    getCountriesApi,
};
