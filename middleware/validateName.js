const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

//helper method
const validateName = (name) =>{
 const schema = {
  name: Joi.string().min(3).required(),
 };
 return Joi.validate(name, schema); 
}// validateName

module.exports = validateName;
