import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Dean from '../models/Dean.js';


export const studentLogin = async (req, res) => {

    try {
        const { universityId, password } = req.body;

        const authToken = uuidv4();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({

            universityId,
            password: hashedPassword,
            authToken
        });

        await newUser.save();

        res.status(200).json({ message: 'Logged in successfull', authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const deanLogin = async (req, res) => {

    try {
        const { universityId, password } = req.body;

        const authToken = uuidv4();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDean = new Dean({

            universityId,
            password: hashedPassword,
            authToken
        });

        await newDean.save();

        res.status(200).json({ message: 'Logged in successfull', authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
