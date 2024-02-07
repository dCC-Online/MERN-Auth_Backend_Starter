const express = require("express");
const router = express.Router();
const { Car, validateCar } = require("../models/car");
const { auth } = require("../middleware/auth");
const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
} = require("../controllers/carsController");

// Route to get all cars for logged-in user.
router.get("/", auth, getAllCars);

// Route to get a single car by ID for the logged-in user.
router.get("/:id", auth, getCarById);

// Route to create a new car for the logged-in user.
router.post("/", auth, createCar);

// Route to update an existing car for the logged-in user
router.put("/:id", auth, updateCar);

// Route to delete an existing car for the logged-in user
router.delete("/:id", auth, deleteCar);

module.exports = router;
