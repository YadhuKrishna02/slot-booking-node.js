import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import User from '../models/User.js';


const loginUser = async (req, res) => {
    try {
        const { universityId, password, role } = req.body;

        const authToken = uuidv4();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            universityId,
            password: hashedPassword,
            token: authToken,
            role,
        });

        await newUser.save();

        res.status(200).json({ message: 'Logged in successfully', authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const studentLogin = async (req, res) => {
    loginUser(req, res);
};

export const deanLogin = async (req, res) => {
    loginUser(req, res);
};