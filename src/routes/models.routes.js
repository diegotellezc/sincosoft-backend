const express = require('express');

//controllers
const modelsController = require('../controllers/models.controller');

const validationMiddleware = require('../middlewares/validations.middleware')

const router = express.Router();

router
  .route('/')
  .get(modelsController.findModels)
  .post(validationMiddleware.createModel, modelsController.createModel)


router
  .route('/:id')
  .get(modelsController.findOneModel)
  .patch(modelsController.updateModel)
  .delete(modelsController.deleteModel);

module.exports = router;
