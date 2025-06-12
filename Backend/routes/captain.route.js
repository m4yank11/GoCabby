const express = require('express')
const router = express.Router()
const captainController = require('../controllers/captain.controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 digits long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate number must be at least 3 characters long'),
    body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of car, bike, or auto')

], captainController.registerCaptain)

router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captainController.loginCaptain)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)



module.exports = router