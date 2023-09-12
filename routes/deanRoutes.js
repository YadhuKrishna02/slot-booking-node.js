import express from "express";
import { verifyUserUUID } from "../middlewares/authMiddleware.js";
import { viewPendingSessions } from "../controllers/deanController.js";

const deanRouter = () => {
    const router = express.Router()

    router.get('/pending-sessions/:id', verifyUserUUID, viewPendingSessions);



    return router
}

export default deanRouter