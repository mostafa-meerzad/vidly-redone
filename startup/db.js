const mongoose = require("mongoose");
const logger = require("../utils/winstonLogger");
const config = require("config");

module.exports = function () {
  const db = config.get("db");

  mongoose
    .connect(db, { useUnifiedTopology: true })
    .then(() => logger.info(`connected to the database... ${config.get("db")}`))
    .catch((e) => logger.error("something failed during connecting to db ", e));
};
