const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('favoriteCountry', {
            id: {
                type: DataTypes.CHAR(3), 
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            flags: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            continents: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            capital: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            subregion: {
                type: DataTypes.STRING,
            },
            area: {
                type: DataTypes.INTEGER,
            },
            population: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false
        });
};
