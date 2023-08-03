const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createVehicle = [
  body('type').notEmpty().withMessage('type cannot be empty'),
  body('model').notEmpty().withMessage('model cannot be empty'),
  body('color').notEmpty().withMessage('color cannot be empty'),
  body('mileage').notEmpty().withMessage('mileage cannot be empty'),
  body('image').notEmpty().withMessage('image cannot be empty'),
  body('condition').notEmpty().withMessage('condition cannot be empty'),
  body('image').notEmpty().withMessage('image cannot be empty'),
  validFields,
];

exports.createModel = [
  body('modelName').notEmpty().withMessage('modelName cannot be empty'),
  body('price').notEmpty().withMessage('price cannot be empty'),
  validFields,
];



