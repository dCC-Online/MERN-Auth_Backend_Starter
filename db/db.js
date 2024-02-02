const mongoose = require("mongoose");

// Function to establish connection to MongoDB.
const connectDb = () => {
    mongoose.set("strictQuery", true); // Enforce strict query filters.

    //Attempt connection to MongoDB
    mongoose
        .connect(process.env.CONNECTION_STRING)
        .then(() => console.log("Connected to MongoDb...")) // Successful connection.
        .catch((err) => {
            // Handle connection error.
            console.log(`Could not connect to MongoDb. Error: ${err}`);
            process.exit(1); // Exit application on error.
        });
};

module.exports = connectDb;
