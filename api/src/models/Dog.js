const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight_max: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height_max: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bred_for: {
        type: DataTypes.STRING,
      },
      breed_group: {
        type: DataTypes.STRING,
      },
      life_span_min: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span_max: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temperament: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
