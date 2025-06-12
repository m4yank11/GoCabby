const userModel = require('../models/user.model')

module.exports.createUser = async ({
    firstname, lastname, email, phone, password
}) => {
    if(!firstname || !lastname || !email || !phone || !password) {
        throw new Error('All fields are required')
    }
    const user = {
        fullname: {
            firstname,
            lastname
        },
        email,
        phone,
        password
    }
    try {
        const newUser = await userModel.create(user)
        return newUser
    } catch (error) {
        throw new Error('Error creating user: ' + error.message)
    }
}