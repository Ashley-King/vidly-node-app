const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

const validateName = name => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };
  return Joi.validate(name, schema);
}; // validateName

exports.Genre = Genre;
exports.validate = validateName;
