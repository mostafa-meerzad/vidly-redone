const express = require("express");
const app = express();
const logger = require("./utils/winstonLogger");
const e = require("express");

require("./startup/logging")()
require("./startup/config")()
require("./startup/db")()
require("./startup/routes")(app)

const port = process.env.PORT || 3000;

app.listen(port, () => {
logger.info(`server listening on port: ${port}`)
});