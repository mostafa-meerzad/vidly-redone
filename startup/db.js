const mongoose = require("mongoose");
const logger = require("../utils/winstonLogger");

module.exports = function () {
  mongoose
    .connect("mongodb://127.0.0.1:27017/vidly", { useUnifiedTopology: true })
    .then(() => logger.info("connected to the database"))
    .catch((e) => logger.error("something failed during connecting to db ", e));
};
