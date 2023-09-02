const express = require("express");
const router = express.Router();

const {validate, Customer} = require("../models/customer");

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

  const { error } = validate(req.body);
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

  const { error } = validate(req.body);
  
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

module.exports = router;
