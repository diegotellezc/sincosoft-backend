const cors = require('cors')
const express = require('express')
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan')
const rateLimit = require('express-rate-limit');
const sanitizer = require('perfect-express-sanitizer');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//routers
const vehiclesRouter = require('./routes/vehicles.routes')
const modelsRouter = require('./routes/models.routes')
const totalsRouter = require('./routes/totals.routes')

const app = express()
const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour!',
});

app.use(express.json())
app.use(cors())
app.use(helmet());
app.use(hpp());
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false,
  })
);

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use('/api/v1', limiter);

//routes
app.use('/api/v1/vehicles', vehiclesRouter);
app.use('/api/v1/models', modelsRouter);
app.use('/api/v1/totals', totalsRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app