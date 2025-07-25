const UserModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const CaptainModel = require('../models/Captain.model');

module.exports.authUser = async (req, res, next) => {
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    try {
        const blacklistedToken = await blacklistTokenModel.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found.' });
        }

        // --- THE BACKWARD-COMPATIBLE FIX ---
        // We assign the user object to BOTH req.user (the correct convention)
        // and req.User (to support your older code). This prevents anything
        // from breaking while you update your codebase.
        req.user = user; 
        req.User = user; // For backward compatibility

        next();
    }
    catch(err){
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({message: 'Unauthorized: Invalid token.'});
        }
        console.error("Auth Middleware Error:", err);
        return res.status(500).json({message: 'An internal error occurred during authentication.'});
    }
};

module.exports.authCaptain = async (req, res, next)=> {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }
    
    try {
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await CaptainModel.findById(decoded._id);
        
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized: Captain not found.' });
        }

        // Applying the same backward-compatible fix for captains
        req.captain = captain; 
        req.Captain = captain; // For backward compatibility

        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({message: 'Unauthorized: Invalid token.'});
        }
        console.error("Auth Captain Middleware Error:", err);
        return res.status(500).json({ message: 'An internal error occurred during authentication.' });
    }
};
