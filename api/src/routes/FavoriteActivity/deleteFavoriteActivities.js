const deleteFavoriteActivity = require('../../controllers/Favorite/deleteFavoriteActivity');

const deleteFavoriteActivities = async (req, res) => {
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

        res.status(404).send(error.message);
    };
};

module.exports = deleteFavoriteActivities;