const config = require("config");
// new approach
module.exports = function () {
  // call config.get method if the configuration dose not exist it throws an exception
  // and we are listening of uncaughtExceptions in the logger module
    config.get("jwtPrivateKey");
};

// apparently the following code is not working and causes the winston to exit without logging the error
// module.exports = function () {
//   if (!config.has("jwtPrivateKey")) {
//     const error = new Error("jwt key is not set");
//     logger.error(error);
//     logger.end()
//     process.exit(1); // Terminate the process with an exit code of 1 (indicating an error)
//   }
// };
