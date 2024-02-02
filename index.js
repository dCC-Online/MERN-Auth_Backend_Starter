require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./db/db");

// Import routes
const auth = require("./routes/auth");
const cars = require("./routes/cars");

// Initialize express application
const app = express();

app.use(cors());
app.use(express.json());
connectDb();

// Define routes
app.use("/api/auth", auth);
app.use("/api/cars", cars);

// Set up and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
