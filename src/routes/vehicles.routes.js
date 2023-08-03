const express = require('express');

//controllers
const vehiclesController = require('../controllers/vehicles.controller');
const vehiclesMiddleware = require('../middlewares/vehicles.middleware')
const validationMiddleware = require('../middlewares/validations.middleware')

const router = express.Router();

router
  .route('/')
  .get(vehiclesController.findVehicles)
  .post(validationMiddleware.createVehicle, vehiclesMiddleware.validVehicle, 
  vehiclesController.createVehicle)


router
  .route('/:id')
  .get(vehiclesController.findOneVehicle)
  .patch(vehiclesController.updateVehicle)
  .delete(vehiclesController.sellVehicle);

module.exports = router;
