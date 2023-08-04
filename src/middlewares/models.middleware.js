const ModelPrices = require("../models/modelPrices.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.validModelExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const model = await ModelPrices.findOne({
    where: {
      model_id: id,
      status: 'active',
    },
  });

  if (!model) {
    return next(new AppError(`Model with id: ${id} was not found`, 404));
  }

  req.model = model;
  next();
});