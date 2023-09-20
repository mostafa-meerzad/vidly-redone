require("winston-mongodb");
const winston = require("winston");

const logger = winston.createLogger({
  level: "silly",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "myLogs.log" }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({ db: "mongodb://127.0.0.1:27017/vidly" }),
  ],
});

module.exports = logger;
