const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 20 },
  phone: { type: String, required: true, minLength: 10, maxLength: 15 },
  isGold: { type: Boolean, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(20),
    phone: Joi.string().required().min(10).max(15),
    isGold: Joi.boolean(),
  });

  return schema.validate(user);
}

module.exports = {validate, Customer}