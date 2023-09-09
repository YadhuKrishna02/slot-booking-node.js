import express from "express";
import { verifyStudentUUID } from "../middlewares/authMiddleware.js";
import { freeSessions, bookSession } from "../controllers/studentController.js";
const studentRouter = () => {
    const router = express.Router()

    router.get('/free-sessions/:deanId', verifyStudentUUID, freeSessions);

    router.post('/book-session/:deanId', verifyStudentUUID, bookSession);


    return router
}

export default studentRouter