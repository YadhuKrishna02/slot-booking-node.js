import { Schema, model, mongoose } from "mongoose";



const sessionSchema = new Schema({
    studentId: {
        type: String,
        ref: 'User',
        required: true,
    },
    deanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    slotStartTime: {
        type: Date,
        required: true,
    },
    bookedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
});



const Session = model('Session', sessionSchema)
export default Session

