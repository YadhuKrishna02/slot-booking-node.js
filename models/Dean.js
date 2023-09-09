import { Schema, model } from "mongoose";

const DeanSchema = new Schema({
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
    pendingSessions: {
        type: Array
    }
});

const Dean = model('Dean', DeanSchema)
export default Dean