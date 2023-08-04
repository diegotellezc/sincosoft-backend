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
  const { model } = req

  res.status(200).json({
    status: 'success',
    model
  })
})

exports.updateModel = catchAsync(async(req, res, next) => {
  const { model } = req
  const { modelName, price } = req.body

  const updatedModel = await model.update({modelName: modelName.toLowerCase(), price})


  res.status(200).json({
    status: 'success',
    updatedModel
  })
})

exports.deleteModel = catchAsync(async(req, res, next) => {
  const { model } = req

  await model.update({status: 'disabled'})

  res.status(200).json({
    status: 'success',
    message: "The model was disabled."
  })
})