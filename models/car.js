const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Define car schema with validation at the database level.
const carSchema = new Schema({
    make: { type: String, required: true, minlength: 2, maxlength: 255 },
    model: { type: String, required: true, minlength: 2, maxlength: 255 },
    year: { type: Number, required: true, min: 1885 }, // Year of manufacture, minimum 1885.
    owner: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the User model.
});

// Create the Car model with carSchema.
const Car = model("Car", carSchema);

//Validate car data with Joi for application-level validation.
const validateCar = (data) => {
    const schema = Joi.object({
        make: Joi.string().min(2).max(255).required(),
        model: Joi.string().min(2).max(255).required(),
        year: Joi.number().min(1885).required(),
        // Validate owner field as a valid MongoDB ObjectId in hexadecimal format.
        owner: Joi.string().hex().length(24).required(),
    });
    return schema.validate(data);
};

module.exports = { Car, validateCar };
