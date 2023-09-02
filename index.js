const express = require("express");
// const Joi = require("joi");
const router = require("./routes/genres");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")
  .then(() => console.log("connected to the database"))
  .catch((e) => console.log(e));
const app = express();

app.use(express.json());
app.use("/api/genre", router)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port: ${port}`));
