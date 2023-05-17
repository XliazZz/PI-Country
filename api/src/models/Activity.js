
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('activity', {
    id: {
      type: DataTypes.INTEGER, //
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
            isInt: true,
        },
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    season: {
        type: DataTypes.ENUM('Summer','Autumn','Winter','Spring'),
        allowNull: false,
        validate: {
          isIn: [['Summer', 'Autumn', 'Winter', 'Spring']],
          notEmpty: true,
        },
    },
  },
  {
    timestamps: false
  });                  
};


/* -  ID. \*
-  Nombre. \*
-  Dificultad (número del 1 al 5). \*
-  Duración (en horas).
-  Temporada (Verano, Otoño, Invierno o Primavera). \* */