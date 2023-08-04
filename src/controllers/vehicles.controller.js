const Vehicles = require('../models/vehicles.model');
const ModelPrices = require('../models/modelPrices.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.findVehicles = catchAsync(async (req, res, next) => {
  const vehicles = await Vehicles.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    results: vehicles.length,
    vehicles,
  });
});

exports.createVehicle = catchAsync(async (req, res, next) => {
  const { newCar, newMotorcycle, usedCar, usedMotorcycle } = req;

  if (newCar) {
    res.status(201).json({
      status: 'success',
      message: 'You have created a new car.',
      newCar,
    });
  } else if (usedCar) {
    res.status(201).json({
      status: 'success',
      message: 'You have created a used car.',
      usedCar,
    });
  } else if (newMotorcycle) {
    res.status(201).json({
      status: 'success',
      message: 'You have created a new motorcycle.',
      newMotorcycle,
    });
  } else if (usedMotorcycle) {
    res.status(201).json({
      status: 'success',
      message: 'You have created a used motorcycle.',
      usedMotorcycle,
    });
  }
});

exports.findOneVehicle = catchAsync(async (req, res, next) => {
  const { vehicle } = req;

  res.status(200).json({
    status: 'success',
    vehicle,
  });
});

exports.updateVehicle = catchAsync(async (req, res, next) => {
  const {
    type,
    model,
    color,
    mileage,
    image,
    condition,
    cylinderCapacity,
    speeds,
    price,
  } = req.body;
  const { vehicle } = req;

  if(model){
    const modelPrice = await ModelPrices.findOne({
      where: { modelName: model.toLowerCase() },
    });
  
    if (!modelPrice) {
      return next(new AppError('The model you have entered is not valid. Does not exist in the model list.', 404))
    }
  }

  if (
    type ||
    model ||
    color ||
    mileage ||
    image ||
    condition ||
    cylinderCapacity ||
    speeds ||
    price
  ) {
    const updatedVehicle = await vehicle.update({type,
      model,
      color,
      mileage,
      image,
      condition,
      cylinderCapacity,
      speeds,
      price });

    res.status(200).json({
      status: 'success',
      updatedVehicle
    });
  } else {
    return next(new AppError('Enter a valid field to update', 404))
  }

});

exports.sellVehicle = catchAsync(async (req, res, next) => {
  const { vehicle } = req;
  const { buyerName, buyerDocument} = req.body

  console.log(req.body)

  const vehicleSold = await vehicle.update({ buyerName, buyerDocument , status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The vehicle was sold.',
    vehicleSold
  });
});
