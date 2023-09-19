const express = require("express");
const app = express();
const logger = require("./utils/winstonLogger");

require("./startup/config")()
require("./startup/logging")()
require("./startup/db")()
require("./startup/routes")(app)

// throw new Error("my error")

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`server listening on port: ${port}`));
