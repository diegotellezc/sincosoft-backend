const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const ModelPrices = db.define('model_prices', {
  modelId: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "model_id",
    type: DataTypes.INTEGER,
  },
  modelName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "model_name",
    unique: true
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = ModelPrices;
