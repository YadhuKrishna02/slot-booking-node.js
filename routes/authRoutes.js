import express from "express";
import { studentLogin, deanLogin } from "../controllers/authController.js";
const authRouter = () => {
    const router = express.Router()
    router.post('/login', studentLogin);
    router.post('/dean-login', deanLogin);


    return router
}

export default authRouter