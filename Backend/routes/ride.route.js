const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
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


module.exports = router
