import mongoose from 'mongoose'

const User = mongoose.model('User', {
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true}
})

export default User;