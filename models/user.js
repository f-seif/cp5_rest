import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address : {
        type: String
    }
})

module.exports = User = mongoose.model('User', UserSchema)