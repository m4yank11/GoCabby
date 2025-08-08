const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const UserController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register', [
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastName').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    // Change this line 👇
    // body('phone').optional().isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 digits'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], UserController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min : 6}).withMessage('Invalid password')
], UserController.loginUser
)

router.get('/profile',authMiddleware.authUser, UserController.getUserProfile )

router.get('/logout', authMiddleware.authUser, UserController.logoutUser)


module.exports = router