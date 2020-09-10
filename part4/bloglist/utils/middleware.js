const logger = require("./logger");

const unknownEndPoint = (request, response) => {
  return response.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name);
  next(error);
};

module.exports = {
  unknownEndPoint,
  errorHandler,
};
