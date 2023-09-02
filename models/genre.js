const Joi = require("joi");
const mongoose = require("mongoose");

const Genre = mongoose.model(
    "Genre",
    new mongoose.Schema({ name: { type: String, required: true } })
  );


function validate(name) {
    const schema = Joi.object({
      name: Joi.string().required().min(5),
    });
    return schema.validate(name);
  }

  module.exports = {Genre, validate}