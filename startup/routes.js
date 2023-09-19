const express = require("express");
const genreRouter = require("../routes/genres");
const customerRouter = require("../routes/customers");
const movie = require("../routes/movies");
const rental = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genre", genreRouter);
  app.use("/api/customer", customerRouter);
  app.use("/api/movie", movie);
  app.use("/api/rental", rental);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  // add error handling middleware
  app.use(error);
};
