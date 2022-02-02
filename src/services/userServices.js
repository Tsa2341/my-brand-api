import User from "../models/user.js"

export const userExist = async (email) => {
    const user = await User.findOne({ email: email })
    if (user) {
        return user
    } else {
        return false
    }
}

export const createUser = async (user) => {
    const userCreated = await User(user)
    await userCreated.save();
    delete userCreated.password;
    return userCreated
}
<<<<<<< HEAD

=======
>>>>>>> 1643e92 (ft: add authentication and validation on required routes)
