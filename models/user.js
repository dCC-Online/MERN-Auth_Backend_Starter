const { Schema, model } = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// Define user schema with unique username and email.
const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
});

// Method to generate an authentication token for a user.
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, username: this.username },
        process.env.JWT_SECRET
    );
};

// Create the User model with the userSchema.
const User = model("User", userSchema);

// Function to validate user data with Joi.
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
}

// Function to validate login credentials with Joi.
function validateLogin(data) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(data);
}

module.exports = { User, validateUser, validateLogin };
