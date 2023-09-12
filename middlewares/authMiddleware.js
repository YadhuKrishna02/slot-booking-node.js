import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

export const verifyUserUUID = async (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const token = bearerToken.split(' ')[1];

    const dbUser = await User.findOne({ token });

    if (dbUser) {
        if (dbUser.role === 'student' || dbUser.role === 'dean') {
            next();
        } else {
            return res.status(401).json({ message: 'Authentication failed. Invalid role.' });
        }
    } else {
        return res.status(401).json({ message: 'Authentication failed. Invalid UUID.' });
    }
};
