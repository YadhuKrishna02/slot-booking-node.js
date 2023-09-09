import express from "express";
import { verifyDeanUUID } from "../middlewares/authMiddleware.js";
import { viewPendingSessions } from "../controllers/deanController.js";

const deanRouter = () => {
    const router = express.Router()

    router.get('/pending-sessions/:id', verifyDeanUUID, viewPendingSessions);



    return router
}

export default deanRouter