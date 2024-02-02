const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser, validateLogin } = require("../models/user");

// Registration route.
router.post("/register", async (req, res) => {
    try {
        // Validate user input.
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send("Invalid registration data.");
        }

        // Check if user already exists.
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).send("User already registered.");
        }

        // Hash password.
        const salt = await bcrypt.genSalt(10);
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
        });

        // Save user to the database.
        await user.save();

        //Gnerate auth token.
        const token = user.generateAuthToken();

        // Send response with token in header.
        res.status(201)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
    } catch (error) {
        res.status(500).send(`Internal Server Error ${error}`);
    }
});

// Login route.
router.post("/login", async (req, res) => {
    // Validate login input.
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send("Invalid login data.");
    }

    // Check if user exists.
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send("No user found with provided username.");
    }

    // Validate password.
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) {
        return res.status(400).send("Invalid Password.");
    }

    // Generate auth token.
    const token = user.generateAuthToken();

    // Send response with token in header.
    res.status(201)
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({ message: "Login successful." });
});

module.exports = router;
