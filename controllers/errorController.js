const AppError = require('./../utils/AppError');

const handleInvalidDataError = (err) => {
  const message = `Invalid data for ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsInMemory = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another name.`;
  return new AppError(message, 400);
};


const handleValidationErrorInMemory = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};


const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('error', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};


module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign({}, err);
    error.message = err.message;
    if (error.type === 'InvalidData') error = handleInvalidDataError(error);
    if (error.code === 'DUPLICATE_FIELD') error = handleDuplicateFieldsInMemory(error);
    if (error.name === 'ValidationError') error = handleValidationErrorInMemory(error);

    sendErrorProd(error, req, res);
  }
};
