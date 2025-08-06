const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const CaptainModel = require('../models/Captain.model');
const { sendMessageToSocketId } = require('../socket');
const RideModel = require('../models/ride.model'); // Import the RideModel

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'Authentication failed. Please log in again.' });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        // 1. The ride is created with just the user's ID.
        const newRide = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });

        // --- THE FIX ---
        // 2. We immediately re-fetch the ride we just created, but this time we use .populate()
        //    to replace the user's ID with the full user object (containing their name).
        const populatedRide = await RideModel.findById(newRide._id).populate({
            path: 'user',
            select: 'fullName email' // Specify which user fields you need
        });
        
        // 3. Find available captains.
        const availableCaptains = await CaptainModel.find({ status: 'active' });

        // 4. Loop through and send the 'populatedRide' object, which now contains the user's name.
        availableCaptains.forEach(captain => {
            if (captain.socketId) {
                console.log(`Sending ride request for ride ${populatedRide._id} to captain ${captain._id}`);
                sendMessageToSocketId(
                    captain.socketId,
                    'new-ride-request', 
                    populatedRide // Send the ride object with the full user details
                );
            }
        });

        // 5. Respond to the user's app.
        return res.status(201).json(populatedRide);
        
    } catch (err) {
        console.error("Error in createRide controller:", err); 
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   
    const { pickup, destination } = req.query;

    try {
        // Your service returns { fare, distanceTime }, so we destructure it here.
        const { fare } = await rideService.getFare(pickup, destination);
        return res.status(200).json({ fare }); // Respond with the nested fare object
    } catch (err) {
        console.error("Error in getFare controller:", err);
        return res.status(500).json({ message: err.message });
    }
};


module.exports.acceptRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId, otp } = req.body;
        const captainId = req.captain._id;

        // Find the ride and check the OTP
        const ride = await RideModel.findById(rideId);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found." });
        }

        if (ride.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // Update the ride with the captain's ID and change status to 'accepted'
        ride.captain = captainId;
        ride.status = 'accepted';
        await ride.save();
        
        // Populate the user and captain details to send back
        const populatedRide = await RideModel.findById(rideId)
            .populate('user', 'fullName socketId')
            .populate('captain', 'fullName vehicle socketId');

        // Notify the user that their ride has been accepted
        if (populatedRide.user && populatedRide.user.socketId) {
            sendMessageToSocketId(
                populatedRide.user.socketId,
                'ride-accepted',
                populatedRide
            );
        }

        // Send a success response to the captain's app
        res.status(200).json({ message: "Ride accepted successfully!", ride: populatedRide });

    } catch (error) {
        console.error("Error accepting ride:", error);
        res.status(500).json({ message: "Server error while accepting ride." });
    }
};
