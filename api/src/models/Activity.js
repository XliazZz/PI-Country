
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('activity', {
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
        type: DataTypes.TIME,
        allowNull: false,
    },
    season: {
        type: DataTypes.STRING,
        allowNull: false,
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