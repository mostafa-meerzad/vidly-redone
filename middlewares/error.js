// const {logger} = require("../startup/logging")
const logger = require("../utils/winstonLogger");


module.exports = function (err, req, res, next) {
    // console.log(err)
    // logger.error({ message: err})
    logger.error("error occurred in a route handler ", err);
    res.status(500).send("something failed");
  } 

