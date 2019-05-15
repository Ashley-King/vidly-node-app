const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
   phone: {
     type: String,
     required: true,
     minlength: 7,
     maxlength: 15
   }
 })
);

const validateCustomer = customer => {
 const schema = {
   phone: Joi.string()
     .min(7)
     .max(15)
     .required(),
   name: Joi.string()
     .min(5)
     .max(50)
     .required(),
   isGold: Joi.boolean()
 };
 return Joi.validate(customer, schema);
}; // validateCustomer

exports.Customer = Customer;
exports.validate = validateCustomer;