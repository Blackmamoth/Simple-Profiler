import { Schema, model } from 'mongoose'

const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        required: true
    },
    fileNames: {
        type: [String],
        required: true
    }
}, { timestamps: true })

const ProfileModel = model('profile', ProfileSchema)

export default ProfileModel