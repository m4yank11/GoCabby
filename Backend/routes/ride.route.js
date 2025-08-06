const express = require('express')
const router = express.Router()
const { body, query } = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').custom(value => {
        const allowedVehicles = ['car', 'bike', 'auto'];
        if (!value || !allowedVehicles.includes(value)) {
            // This will throw an error that express-validator will catch.
            throw new Error('Invalid vehicle type. Must be one of: car, bike, or auto.');
        }
        // If the value is valid, we must return true to indicate success.
        return true;
    }),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

router.post('/accept',
    authMiddleware.authCaptain, // Make sure a captain is logged in
    body('rideId').isMongoId().withMessage('Invalid Ride ID'),
    body('otp').isString().isLength({ min: 4, max: 4 }).withMessage('Invalid OTP'),
    rideController.acceptRide
);


module.exports = router
