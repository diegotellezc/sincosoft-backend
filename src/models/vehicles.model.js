const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Vehicles = db.define('vehicles', {
  vehicleId: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "vehicle_id",
    type: DataTypes.INTEGER,
  },
  type: {
    type: DataTypes.ENUM('car', 'motorcycle'),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mileage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registrationDate: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "registration_date"
  },
  condition: {
    type: DataTypes.ENUM('new', 'used'),
    allowNull: false,
  },
  buyerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  buyerDocument: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cylinderCapacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "cylinder_capacity"
  },
  speeds: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'disabled'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Vehicles;
