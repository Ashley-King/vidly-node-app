const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const validateName = require("../middleware/validateName");

// error status message
const error404Message = "That one ain't here, yo.";
// create genres

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    isGold: {
      type: Boolean,
      required: true,
      default: false
    },
    phone: Number
  })
);
// get list of customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

//create a customer
router.post("/", async (req, res) => {
  const result = validateName(req.body);
  //console.log(result.error.details);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let customer = new Customer({ name: req.body.name });
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
  const result = validateName(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
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
