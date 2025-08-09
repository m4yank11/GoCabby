const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const CaptainModel = require('../models/captain.model');
const { sendMessageToSocketId } = require('../socket');
const RideModel = require('../models/ride.model'); // Import the RideModel
const { sendMessageToUser } = require('../socket');
const { broadcastToCaptains } = require('../socket')


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
        
        // ✨ THE FIX: Replace the database lookup and loop with a single broadcast
        broadcastToCaptains('new-ride-request', populatedRide);
        console.log(`Ride request ${populatedRide._id} broadcasted to all available captains.`);

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

        const ride = await RideModel.findById(rideId);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found." });
        }

        // ✨ --- CRITICAL FIX: Check if ride is still available --- ✨
        if (ride.status !== 'pending') {
            return res.status(409).json({ message: "This ride has already been taken." }); // 409 means "Conflict"
        }

        // Using String() makes the comparison safer against different data types (e.g., "2410" vs 2410)
        if (String(ride.otp) !== String(otp)) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // Update the ride with the captain's ID and change status
        ride.captain = captainId;
        ride.status = 'accepted';
        await ride.save();
        
        // Populate details to send back
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
        
        // Also, notify all other captains that this ride is no longer available
        broadcastToCaptains('ride-taken', { rideId: ride._id });

        // Send a success response to the captain's app
        res.status(200).json({ message: "Ride accepted successfully!", ride: populatedRide });

    } catch (error) {
        console.error("Error accepting ride:", error);
        res.status(500).json({ message: "Server error while accepting ride." });
    }
};

module.exports.completeRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId } = req.body;
        const captainId = req.captain._id;

        const ride = await RideModel.findById(rideId);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found." });
        }

        // Ensure the ride is accepted and belongs to this captain
        if (ride.status !== 'accepted' || String(ride.captain) !== String(captainId)) {
            return res.status(403).json({ message: "You are not authorized to complete this ride." });
        }

        // Update the ride status to completed
        ride.status = 'completed';
        await ride.save();

        // Notify the user that their ride has been completed
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(
                ride.user.socketId,
                'ride-completed',
                { message: "Your ride has been completed successfully.", ride }
            );
        }

        // Optionally, notify the captain as well
        sendMessageToSocketId(
            req.captain.socketId,
            'ride-completed',
            { message: "You have successfully completed the ride.", ride }
        );

        res.status(200).json({ message: "Ride completed successfully!", ride });

    } catch (error) {
        console.error("Error completing ride:", error);
        res.status(500).json({ message: "Server error while completing ride." });
    }
};