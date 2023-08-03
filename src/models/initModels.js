const Vehicles = require('./vehicles.model')
const ModelPrices = require('./modelPrices.model')

const initModel = () => {
  ModelPrices.hasMany(Vehicles, { foreignKey: 'modelId' });
  Vehicles.belongsTo(ModelPrices, { foreignKey: 'modelId' });
};

module.exports = initModel;