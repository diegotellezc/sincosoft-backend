const Vehicles = require('../models/vehicles.model')
const ModelPrices = require('../models/modelPrices.model')
const catchAsync = require('../utils/catchAsync')

exports.findVehicles = catchAsync(async(req,res,next) => {
  const vehicles = await Vehicles.findAll({
    where: {
      status: 'active'
    }
  })

  res.status(200).json({
    status: 'success',
    results: vehicles.length,
    vehicles
  })
})

exports.createVehicle = catchAsync(async(req,res,next) => {
  const {newCar,
    newMotorcycle,
    usedCar,
    usedMotorcycle} = req

  if(newCar){
    res.status(201).json({
      status: 'success',
      message: 'You have created a new car.',
      newCar,
    });
  } else if(usedCar) {
    res.status(201).json({
      status: 'success',
      message: 'You have created a used car.',
      usedCar,
    })
  } else if(newMotorcycle){
    res.status(201).json({
      status: 'success',
      message: 'You have created a new motorcycle.',
      newMotorcycle,
    })
  } else if (usedMotorcycle){
    res.status(201).json({
      status: 'success',
      message: 'You have created a used motorcycle.',
      usedMotorcycle,
    })
  }
});


exports.findOneVehicle = catchAsync(async(req,res,next) => {
  res.status(200).json({
    status: 'success'
  })
})

exports.updateVehicle = catchAsync(async(req,res,next) => {
  res.status(200).json({
    status: 'success'
  })
})

exports.sellVehicle = catchAsync(async(req,res,next) => {
  res.status(200).json({
    status: 'success'
  })
})