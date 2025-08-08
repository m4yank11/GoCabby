const UserModel = require('../models/user.model')

module.exports.createUser = async ({
    firstName, lastName, email, password
}) => {
    if(!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required')
    }
    const User = {
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    }
    try {
        const newUser = await UserModel.create(User)
        return newUser
    } catch (error) {
        throw new Error('Error creating User: ' + error.message)
    }
}