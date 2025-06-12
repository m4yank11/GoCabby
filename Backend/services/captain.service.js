const captainModel = require('../models/captain.model')

module.exports.createCaptain = async ({
    firstname, lastname, email, phone, password, color, plate, type
}) => {
    if(!firstname || !lastname || !email || !phone || !password || !color || !plate || !type) {
        throw new Error('All fields are required')
    }
    const captain = {
        fullname: {
            firstname,
            lastname
        },
        email,
        phone,
        password,
        vehicle: {
            color,
            plate,
            type
        }
    }
    try {
        const newCaptain = await captainModel.create(captain)
        return newCaptain
    } catch (error) {
        throw new Error('Error creating captain: ' + error.message)
    }
}