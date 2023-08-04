const ModelPrices = require("../models/modelPrices.model");
const Vehicles = require("../models/vehicles.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.validVehicle = catchAsync(async(req, res, next) => {
  const { type,
    model,
    color,
    mileage,
    image,
    condition,
    cylinderCapacity,
    speeds, 
    price } = req.body
  
  const registrationDate = new Date().toString()
  
  const modelPrice = await ModelPrices.findOne({
    where: { modelName: model.toLowerCase() },
  });

  if (!modelPrice) {
    return next(new AppError('The model you have entered is not valid. Does not exist in the model list.', 404))
  }

  if (condition === 'new') {
    if(type === 'car'){
      const car = await Vehicles.create({
        type,
        model: model.toLowerCase(),
        modelId: modelPrice.modelId,
        color: color.toLowerCase(),
        mileage,
        image,
        registrationDate,
        condition,
        price: modelPrice.price,
      });
    
      req.newCar = car
      next()
    } else if(type === 'motorcycle') {
      const motorcycle = await Vehicles.create({
        type,
        model: model.toLowerCase(),
        modelId: modelPrice.modelId,
        color: color.toLowerCase(),
        mileage,
        image,
        registrationDate,
        condition,
        cylinderCapacity,
        speeds,
        price: modelPrice.price,
      });
    
      req.newMotorcycle = motorcycle
      next()
    } else {
      return next(new AppError('The type of the vehicle must be "car" or "motorcycle".', 404))
    }
    
  } else if (condition === 'used' && price) {
    if(type === 'car'){
      const car = await Vehicles.create({
        type,
        model: model.toLowerCase(),
        modelId: modelPrice.modelId,
        color: color.toLowerCase(),
        mileage,
        image,
        registrationDate,
        condition,
        price: modelPrice.price,
      });
    
      req.usedCar = car
      next()
    } else if(type === 'motorcycle') {
      const motorcycle = await Vehicles.create({
        type,
        model: model.toLowerCase(),
        modelId: modelPrice.modelId,
        color: color.toLowerCase(),
        mileage,
        image,
        registrationDate,
        condition,
        cylinderCapacity,
        speeds,
        price,
      });
    
      req.usedMotorcycle = motorcycle
      next()
    } else {
      return next(new AppError('The type of the vehicle must be "car" or "motorcycle".', 404))
    }
    
  } else if(condition === 'used' && !price) {
    return next(new AppError('The price must be provided for used vehicles.', 404))
  } else {
    return next(new AppError('The condition of the vehicle must be "new" or "used".', 404))
  }
})

exports.validVehiclelExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const vehicle = await Vehicles.findOne({
    where: {
      vehicle_id: id,
      status: 'active',
    },
  });

  if (!vehicle) {
    return next(new AppError(`The vehicle with id: ${id} was not found`, 404));
  }

  req.vehicle = vehicle;
  next();
});