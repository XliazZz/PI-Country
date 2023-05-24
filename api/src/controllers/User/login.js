const { User } = require('../../db');

const login = async (email, password) => {
    if (!email || !password) {
        throw new Error('Missing data');
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
        throw new Error('User not found');
        }
        if (user.password !== password) {
        throw new Error('Incorrect password');
        }
        return user;
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    };
};

module.exports = login;
