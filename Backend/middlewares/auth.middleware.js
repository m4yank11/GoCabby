const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/blacklistToken.model')
const CaptainModel = require('../models/Captain.model')

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
        const User = await UserModel.findById(decoded._id)
        if (!User) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }
        req.User = User
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
        const Captain = await CaptainModel.findById(decoded._id)
        if (!Captain) {
            return res.status(401).json({ message: 'Unauthorized access' })
        }
        req.Captain = Captain
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized access' })
    }
}