import express from "express";
import { verifyUserUUID } from "../middlewares/authMiddleware.js";
import { freeSessions, bookSession } from "../controllers/studentController.js";
const studentRouter = () => {
    const router = express.Router()

    router.get('/free-sessions/:deanId', verifyUserUUID, freeSessions);

    router.post('/book-session/:deanId', verifyUserUUID, bookSession);


    return router
}

export default studentRouter