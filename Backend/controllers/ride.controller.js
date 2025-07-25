const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // --- Authentication Check ---
    if (!req.user) {
        console.error("Authentication error: req.user is not defined. Check authMiddleware.");
        return res.status(401).json({ message: 'Authentication failed. Please log in again.' });
    }
    // --- End of Check ---


    // We can now safely access req.user._id
    const { pickup, destination, vehicleType } = req.body;
    console.log("Request Body in Controller:", req.body);


    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        return res.status(201).json(ride);
    } catch (err) {
        // It's good practice to log the full error for easier debugging
        console.error("Error in createRide controller:", err); 
        return res.status(500).json({ message: err.message });
    }
};
