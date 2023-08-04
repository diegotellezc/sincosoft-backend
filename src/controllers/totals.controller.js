const Vehicles = require("../models/vehicles.model");
const catchAsync = require("../utils/catchAsync");


exports.totalsByTypes = catchAsync(async(req, res, next) => {
    const cars = await Vehicles.findAll({
        where: {
            type: 'car'
        }
    })

    const motorcycles = await Vehicles.findAll({
        where: {
            type: 'motorcycle'
        }
    })

    const carsTotalPrice = cars.reduce((total, car) => total + car.price , 0)
    const motorcyclesTotalPrice = motorcycles.reduce((total, moto) => total + moto.price , 0)

    res.status(200).json({
        status: 'success',
        carsQuantity: cars.length,
        carsTotalPrices: carsTotalPrice,
        motorcyclesQuantity: motorcycles.length,
        motorcyclesTotalPrices: motorcyclesTotalPrice
      });
})