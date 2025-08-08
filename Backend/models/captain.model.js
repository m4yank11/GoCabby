const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const CaptainSchema = new mongoose.Schema({

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
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be atleast 6 characters long"],
    },
    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    vehicle: {
        type: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
            default: 'car'
        },
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be atleast 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate number must be atleast 3 characters long"]
        }
    },

    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }

    }


})

CaptainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
    return token
},

CaptainSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (error){
        throw new Error('Password comparison failed')
    }
}

CaptainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

module.exports = mongoose.models.Captain || mongoose.model('Captain', CaptainSchema);