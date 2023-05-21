const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('favoriteActivity', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM('Summer','Autumn','Winter','Spring'),
            allowNull: false,
        }
    }, { timestamps: true });
};