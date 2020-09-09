const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("method..", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndPoint = (request, response) => {
  return response.status(404).json({ message: "unknownEndpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name);
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
};
