const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    blacklistedAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60  // 1 hour in seconds
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);