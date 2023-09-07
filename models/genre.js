const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema =  new mongoose.Schema({ name: { type: String, required: true } })

const Genre = mongoose.model(
    "Genre",
   genreSchema
  );


function validate(name) {
    const schema = Joi.object({
      name: Joi.string().required().min(5),
    });
    return schema.validate(name);
  }

  module.exports = {Genre, validate, genreSchema}