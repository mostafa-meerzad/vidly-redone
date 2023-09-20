require("express-async-errors");
const logger = require("../utils/winstonLogger");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    logger.error("uncaught exception occurred ", ex);
  });

  process.on("unhandledRejection", (ex) => {
    logger.error("something failed ", ex);
  });
};
