const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

const router = express.Router();

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 20 },
  phone: { type: String, required: true, minLength: 10, maxLength: 15 },
  isGold: { type: Boolean, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  //Todo
  // find all the document in the customers collection
  // send all customers to client
  const customers = await Customer.find();
  res.send(customers);
});

router.post("/", async (req, res) => {
  // Todo
  // validate the data
  // create the customer
  // send back the customer

  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //   try {
  const customer = await Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  const result = await customer.save();

  return res.send(result);
  //   } catch (err) {
  // console.log("something went wrong creating a new customer");
  // console.log(err);
  //   }
});

router.get("/:id", async (req, res) => {
  // Todo
  // find the customer
  // if no customer return 404
  // return the customer
  const customer = await Customer.find({ _id: req.params.id });

  if (!customer) return res.status(404).send("no such customer found!");

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  // Todo
  // validate the update data
  // return 400 if not valid
  // look up for the customer and update
  // if no customer return 404

  const { error } = validateCustomer(req.body);
  
  if (error) return res.status(400).send(error.details[0].message);
  
  const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
      {new: true}
    );

  if (!customer)
    return res.status(404).send("no such customer with provided id to update");

  res.send(customer)
});

router.delete("/:id", async (req, res) => {
    // todo
    // look up for the customer and delete
    // if no customer return 404
    // return deleted customer

    const customer = await Customer.findOneAndRemove({ _id: req.params.id });
    if(!customer) return res.status(404).send("no such customer to remove")
    res.send(customer)
})

function validateCustomer(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(20),
    phone: Joi.string().required().min(10).max(15),
    isGold: Joi.boolean(),
  });

  return schema.validate(user);
}
module.exports = router;
