const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/Create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid Destination Address'),
    body('vehicelType').isString().isIn(['car','bike','auto']).withMessage('Ab kya hawai jahaj chahiye?'),
    rideController.createRide
)

module.exports = router
