const { FavoriteCountry, User } = require('../../db');

const postFavoriteCountry = async (country) => {
    try {
        const newFavoriteCountry = await FavoriteCountry.create({
            id: country.id,
            name: country.name,
            flags: country.flags,
            continents: country.continents,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population
        });
        // Asociar el FavoriteCountry al User
        const user = await User.findOne(); // Obtiene un usuario existente (puedes adaptarlo según tus necesidades)
        await user.addFavoriteCountry(newFavoriteCountry);
        return newFavoriteCountry;
    } catch (error) {
        throw new Error('Could not create favorite country: ' + error.message);
    };
};

module.exports = postFavoriteCountry;