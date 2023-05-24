const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('message', {
    // Definición de las columnas del modelo
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, { timestamp: false });
};
