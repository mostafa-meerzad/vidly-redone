const winston = require("winston");
require("winston-mongodb")
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports:[
    new winston.transports.File({filename:"myLogs.log"}),
    new winston.transports.MongoDB({db:"mongodb://127.0.0.1:27017/vidly"})
  ]
})

module.exports = function (err, req, res, next) {
    // console.log(err)
    // logger.error({ message: err})
    logger.error(err, err.message);
    res.status(500).send("something failed");
  } 