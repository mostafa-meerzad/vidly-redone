// const {logger} = require("../startup/logging")
const logger = require("../utils/winstonLogger");


module.exports = function (err, req, res, next) {
    // console.log(err)
    // logger.error({ message: err})
    logger.error(err, err.message);
    res.status(500).send("something failed");
  } 

