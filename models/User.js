import { Schema, model } from "mongoose";

const userSchema = new Schema({
    universityId: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    authToken: {
        type: String,
        required: false,
    },

});

const User = model('User', userSchema)
export default User