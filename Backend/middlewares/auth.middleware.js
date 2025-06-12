const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.model')
const captainModel = require('../models/captain.model')

module.exports.authUser = async (req, res, next) => {
    
    // Check if the token is present in cookies or headers
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]

    if(!token){
        return res.status(401).json({ message: 'Unauthorized access' })
    }

    // Check if the token is blacklisted
    const BlacklistToken = require('../models/blacklistToken.model')
    const blacklistedToken = await BlacklistToken.findOne({ token })
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }
        req.user = user
        next()
    }
    catch(err){
        return res.status(401).json({message: 'Unauthorized access'})
    }
}

module.exports.authCaptain = async (req, res, next)=> {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]
    if(!token){
        return res.status(401).json({ message: 'Unauthorized access' })
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token })
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }
        req.captain = captain
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }
}