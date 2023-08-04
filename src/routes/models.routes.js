const express = require('express');

//controllers
const modelsController = require('../controllers/models.controller');

const validationMiddleware = require('../middlewares/validations.middleware')
const modelsMiddleware = require('../middlewares/models.middleware')

const router = express.Router();

router
  .route('/')
  .get(modelsController.findModels)
  .post(validationMiddleware.validModel, modelsController.createModel)


router
  .use('/:id', modelsMiddleware.validModelExists)
  .route('/:id')
  .get(modelsController.findOneModel)
  .patch(validationMiddleware.validModel, modelsController.updateModel)
  .delete(modelsController.deleteModel);

module.exports = router;
