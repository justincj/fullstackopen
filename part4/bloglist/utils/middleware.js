const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("method..", request.method);
  logger.info("url..", request.url);
  logger.info("body..", request.body);
  next();
};

const unknownEndPoint = (request, response) => {
  return response.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name);
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformed id",
    });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).send({ error: "jsonwebtokenerror" });
  }
  next(error);
};

module.exports = {
  unknownEndPoint,
  errorHandler,
  requestLogger,
};
