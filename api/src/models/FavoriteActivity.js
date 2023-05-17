const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('favoriteActivity', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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