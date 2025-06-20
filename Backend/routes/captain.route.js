const express = require('express')
const router = express.Router()
const CaptainController = require('../controllers/captain.controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register', [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastName').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate number must be at least 3 characters long'),
    body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of car, bike, or auto')

], CaptainController.registerCaptain)

router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], CaptainController.loginCaptain)

router.get('/profile', authMiddleware.authCaptain, CaptainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, CaptainController.logoutCaptain)



module.exports = router