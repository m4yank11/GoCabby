const blacklistTokenModel = require('../models/blacklistToken.model')
const CaptainModel = require('../models/captain.model')
const CaptainService = require('../services/captain.service')
const { validationResult } = require('express-validator')

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullName, email, password, vehicle } = req.body

    const ifCaptainAlreadyExists = await CaptainModel.findOne({ email })
    if(ifCaptainAlreadyExists){
        return res.status(400).json({ message: 'Captain with this email already exists'})
    }
    
    const hashedPassword = await CaptainModel.hashPassword(password)

    // --- FIX: Use lowercase 'captain' key in response ---
    const captain = await CaptainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        type: vehicle.type
    })
 
    const token = captain.generateAuthToken()
    
    // --- FIX: Respond with lowercase 'captain' key ---
    res.status(201).json({token, captain})
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Use lowercase variable for consistency
    const captain = await CaptainModel.findOne( {email} ).select('+password')
    if(!captain){
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await captain.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = captain.generateAuthToken()
    res.cookie('token', token)

    // --- FIX: Respond with lowercase 'captain' key ---
    res.status(200).json({token, captain})
}

module.exports.getCaptainProfile = async(req, res, next) => {
    // --- FIX: Read from req.captain and respond with lowercase 'captain' key ---
    res.status(200).json({ captain: req.captain })
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if (token) {
        await blacklistTokenModel.create({ token })
    }
    res.clearCookie('token')
    res.status(200).json({ message: 'Logged out successfully' })
}
