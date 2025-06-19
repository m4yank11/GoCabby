const blacklistTokenModel = require('../models/blacklistToken.model')
const UserModel = require('../models/User.model')
const UserService = require('../services/User.service')
const { validationResult } = require('express-validator')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    console.log(req.body)
    const { fullName, email, password } = req.body

    const ifUserAlreadyExists = await UserModel.findOne({ email })
        if(ifUserAlreadyExists){
            return res.status(400).json({ message: 'User with this email already exists'})
        }

    
    const hashedPassword = await UserModel.hashPassword(password)

    const User = await UserService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    })


    const token = User.generateAuthToken()
    
    res.status(201).json({token, User})
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const User = await UserModel.findOne( {email} ).select('+password')
    if(!User){
        res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await User.comparePassword(password)
    if(!isMatch){
        res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = User.generateAuthToken()
    res.cookie('token', token)

    res.status(200).json({token, User})

}

module.exports.getUserProfile = async(req, res, next) => {
    res.status(200).json(req.User)
}

module.exports.logoutUser = async (req, res, next) => {

    res.clearCookie('token')

    // Clear the token from cookies or headers
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await blacklistTokenModel.create({ token })
    // This will prevent the token from being used again in the future.

    res.clearCookie('token')

    res.status(200).json({ message: 'Logged out successfully' })
}
