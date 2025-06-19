const blacklistTokenModel = require('../models/blacklistToken.model')
const CaptainModel = require('../models/Captain.model')
const CaptainService = require('../services/Captain.service')
const { validationResult } = require('express-validator')

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    console.log(req.body)
    const { fullName, email, phone, password, vehicle } = req.body

    const ifCaptainAlreadyExists = await CaptainModel.findOne({ email })
    if(ifCaptainAlreadyExists){
        return res.status(400).json({ message: 'Captain with this email already exists'})
    }

    
    const hashedPassword = await CaptainModel.hashPassword(password)

    const Captain = await CaptainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        phone,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        type: vehicle.type
    })

 
    const token = Captain.generateAuthToken()
    
    res.status(201).json({token, Captain})
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const Captain = await CaptainModel.findOne( {email} ).select('+password')
    if(!Captain){
        res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await Captain.comparePassword(password)
    if(!isMatch){
        res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = Captain.generateAuthToken()
    res.cookie('token', token)

    res.status(200).json({token, Captain})

}

module.exports.getCaptainProfile = async(req, res, next) => {
    res.status(200).json(req.Captain)
}

module.exports.logoutCaptain = async (req, res, next) => {

    res.clearCookie('token')

    // Clear the token from cookies or headers
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await blacklistTokenModel.create({ token })
    // This will prevent the token from being used again in the future.

    res.clearCookie('token')

    res.status(200).json({ message: 'Logged out successfully' })
}
