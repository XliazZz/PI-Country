const createUser = require('../../controllers/User/createUser');
const path = require('path');

const createUsers = async (req, res) => {
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
    };
};

module.exports = createUsers;