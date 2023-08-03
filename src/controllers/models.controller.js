const Vehicles = require('../models/vehicles.model')
const ModelPrices = require('../models/modelPrices.model')
const catchAsync = require('../utils/catchAsync')

exports.findModels = catchAsync(async(req, res, next) => {
  const models = await ModelPrices.findAll({
    where: {
      status: 'active'
    }
  })

  res.status(200).json({
    status: 'success',
    results: models.length,
    models
  })
})

exports.createModel = catchAsync(async(req, res, next) => {
  const { modelName, price } = req.body

  const model = await ModelPrices.create({
    modelName: modelName.toLowerCase(),
    price
  })

  res.status(201).json({
    status: 'success',
    message: "You have created a model",
    model
  })
})

exports.findOneModel = catchAsync(async(req, res, next) => {
  res.status(200).json({
    status: 'success'
  })
})

exports.updateModel = catchAsync(async(req, res, next) => {
  res.status(200).json({
    status: 'success'
  })
})

exports.deleteModel = catchAsync(async(req, res, next) => {
  res.status(200).json({
    status: 'success'
  })
})