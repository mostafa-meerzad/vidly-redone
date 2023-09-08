const express = require("express");
// const Joi = require("joi");
const genreRouter = require("./routes/genres");
const customerRouter = require("./routes/customers");
const movie = require("./routes/movies")
const rental = require("./routes/rentals")
const users = require("./routes/users")
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")
  .then(() => console.log("connected to the database"))
  .catch((e) => console.log(e));
const app = express();

app.use(express.json());
app.use("/api/genre", genreRouter)
app.use("/api/customer", customerRouter)
app.use("/api/movie", movie)
app.use("/api/rental", rental)
app.use("/api/users", users)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port: ${port}`));
