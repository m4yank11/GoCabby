const CaptainModel = require('../models/Captain.model')

module.exports.createCaptain = async ({
    firstName, lastName, email, phone, password, color, plate, type
}) => {
    if(!firstName || !lastName || !email || !phone || !password || !color || !plate || !type) {
        throw new Error('All fields are required')
    }
    const Captain = {
        fullName: {
            firstName,
            lastName
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
        const newCaptain = await CaptainModel.create(Captain)
        return newCaptain
    } catch (error) {
        throw new Error('Error creating Captain: ' + error.message)
    }
}