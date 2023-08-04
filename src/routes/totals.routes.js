const express = require('express');

//controllers
const totalsController = require('../controllers/totals.controller')

const router = express.Router();

router
  .route('/')
  .get(totalsController.totalsByTypes)


  module.exports = router;