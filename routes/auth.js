const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const Joi = require("joi");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("userName or password is invalid");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("userName or password is invalid");

  res.send(user.generateAuthToken());
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(req);
}

module.exports = router;
