const login = require('../../controllers/User/login');

const logins = async (req, res) => {
    try {
        const { email, password } = req.query;
        
        const user = await login(email, password);

        return res.status(200).json({ access: true });

    } catch (error) {
        return res.status(404).send(error.message)
    };
};

module.exports = logins;