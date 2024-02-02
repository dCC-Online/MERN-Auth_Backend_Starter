const jwt = require("jsonwebtoken");

// Middleware to authenticate and authorize users.
function auth(req, res, next) {
    // Extract token from Authorization header.
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    // Deny access is token is missing.
    if (!token) {
        return res.status(401).send("Access denied. Token is missing.");
    }
    try {
        // Verify token with the secret key and decode it.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user payload to request object.
        next(); // Pass control to the next middleware.
    } catch (error) {
        // Respond with an error if the token is invalid.
        res.status(401).send("Invalid token.");
    }
}

module.exports = { auth };
