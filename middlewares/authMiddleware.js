import Dean from "../models/Dean.js";
import User from "../models/User.js";

export const verifyDeanUUID = async (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized dean' });
    }

    const token = bearerToken.split(' ')[1];


    const dbToken = await Dean.findOne({ authToken: token });
    if (dbToken?.authToken === token) {
        next()
    }
    else {
        return res.status(401).json({ message: 'Authentication failed. Invalid UUID.' });
    }


};



// student middleware 

export const verifyStudentUUID = async (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const token = bearerToken.split(' ')[1];


    const dbToken = await User.findOne({ authToken: token });
    if (dbToken?.authToken === token) {
        next()
    }
    else {
        return res.status(401).json({ message: 'Authentication failed. Invalid UUID.' });
    }


};


