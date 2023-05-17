const { User } = require('../../db');

const createUser = async (userData) => {
    try {
        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
            throw new Error('Missing data: email, password, firtsname and lastname');
        }

        const [user, created] = await User.findOrCreate({
            where: { email: userData.email },
            defaults: userData
        });

        if (!created) {
            throw new Error('Email is already taken');
        }

        return user;

    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

module.exports = createUser;
