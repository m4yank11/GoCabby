const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be atleast 3 characters long"]
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, "Last name must be atleast 3 characters long"]
        }
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "E-mail must be atleast 5 characters long"]
        },
    phone: {
        type: String,
        required: true,
        length: [10, "Phone number must be of 10 digit"]
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

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    return token
}

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (error) {
        throw new Error('Password comparison failed')
    }
}


userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('User', userSchema)
module.exports = userModel