const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 55 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 }, // maxlength should be higher because we are going to hash it and then store in the database
  isAdmin:Boolean
});
userSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({ _id: this._id, isAdmin:this.isAdmin }, config.get("jwtPrivateKey"));
  return token
}
const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(55),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),

  });

  return schema.validate(user);
}

module.exports = { User, validate };
