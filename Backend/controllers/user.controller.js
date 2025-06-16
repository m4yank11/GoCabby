const blacklistTokenModel = require('../models/blacklistToken.model')
const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    console.log(req.body)
    const { fullname, email, phone, password } = req.body

    const ifUserAlreadyExists = await userModel.findOne({ email })
        if(ifUserAlreadyExists){
            return res.status(400).json({ message: 'User with this email already exists'})
        }

    
    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        phone,
        password: hashedPassword
    })


    const token = user.generateAuthToken()
    
    res.status(201).json({token, user})
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await userModel.findOne( {email} ).select('+password')
    if(!user){
        res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = user.generateAuthToken()
    res.cookie('token', token)

    res.status(200).json({token, user})

}

module.exports.getUserProfile = async(req, res, next) => {
    res.status(200).json(req.user)
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
