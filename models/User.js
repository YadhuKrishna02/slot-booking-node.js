import { Schema, model } from "mongoose";

const userSchema = new Schema({
    universityId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ['student', 'dean'],
        required: true,
    },

});

const User = model('User', userSchema)
export default User