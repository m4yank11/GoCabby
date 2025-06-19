const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const UserSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be atleast 3 characters long"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, "Last name must be atleast 3 characters long"]
        }
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address' ],
        minlength: [5, "E-mail must be atleast 5 characters long"]
        },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be atleast 6 characters long"],
    },
    socketId: {
        type: String
    }
    
})

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    return token
}

UserSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (error) {
        throw new Error('Password comparison failed')
    }
}


UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel