const {Customer, validate} = require('../models/customer')
const express = require("express");
const router = express.Router();


// error status message
const error404Message = "That one ain't here, yo.";
// create genres


// get list of customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

//create a customer
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();
  res.send(customer);
});

//get a single customer
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
  } catch {
    return res.status(404).send(`${error404Message}`);
  }
});

//update a customer
router.put("/:id", async (req, res) => {
  const result = validate(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
      { new: true }
    );
    res.send(customer);
  } catch {
    return res.status(404).send(`${error404Message}`);
  }
});

//delete customer
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    res.send(customer);
  } catch {
    return res.status(404).send(`${error404Message}`);
  }
});

module.exports = router;
