const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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