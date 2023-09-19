const express = require("express");
// const Joi = require("joi");
const winston = require("winston");
require("express-async-errors");
const config = require("config");
const genreRouter = require("./routes/genres");
const customerRouter = require("./routes/customers");
const movie = require("./routes/movies");
const rental = require("./routes/rentals");
const users = require("./routes/users");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const {error, logger} = require("./middlewares/error");
// console.log(config.get("jwtPrivateKey"));
// console.log(config.has("jwtPrivateKey"));
// if(!config.has("jwtPrivateKey")) {
if (!config.has("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}
// winston is not capable of handling errors outside of request-processing-pipeline

process.on("uncaughtException", (ex) => {
  console.log(ex)
  // here you can use winston to log to a file or wherever you want
  logger.error("uncaught exception occurred ", ex)

})

process.on("unhandledRejection", (ex) =>{
  console.log(ex)
  logger.error("something failed ", ex)

} )

mongoose
.connect("mongodb://127.0.0.1:27017/vidly", { useUnifiedTopology: true })
.then(() => console.log("connected to the database"))
  .catch((e) => console.log(e));
  const app = express();

  // throw new Error("my error")

// let p = Promise.reject(new Error("something failed during resolving the promise"))
// p.then((data) => console.log(data))

app.use(express.json());
app.use("/api/genre", genreRouter);
app.use("/api/customer", customerRouter);
app.use("/api/movie", movie);
app.use("/api/rental", rental);
app.use("/api/users", users);
app.use("/api/auth", auth);

// add error handling middleware
app.use(error);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port: ${port}`));
