import Dean from "../models/Dean.js"
import mongoose from "mongoose";


export const freeSessions = async (req, res) => {


    try {
        const slots = [];
        const deanId = req.params.deanId

        const generateNext30DaysSlots = (() => {
            const today = new Date();
            const thirtyDaysFromNow = new Date(today);
            thirtyDaysFromNow.setDate(today.getDate() + 30);

            let currentDate = today;

            while (currentDate <= thirtyDaysFromNow) {
                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek === 4 || dayOfWeek === 5) {
                    slots.push(
                        { date: currentDate.toDateString() },
                    );
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
            return slots;
        })()

        const dean = await Dean.findById(deanId);

        if (!dean) {
            return res.status(404).json({ message: "Dean not found" });
        }

        const availableSlots = [];

        for (let i = 0; i < slots.length; i++) {
            const dateToCheck = slots[i].date;
            const isDateInPendingDates = dean.pendingSessions.some((availableDate) => {
                return Object.keys(availableDate)[0] === dateToCheck;
            });

            if (!isDateInPendingDates) {
                availableSlots.push(slots[i]);
            }
        }
        res.status(200).json({ message: "Available slots fetched", availableSlots })


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

}


export const bookSession = async (req, res) => {

    try {
        const deanId = req.params.deanId
        const { sessionDate, studentId } = req.body;

        const dean = await Dean.findById(deanId);

        if (!dean) {
            return res.status(404).json({ message: "Dean not found" });
        }

        const existingSession = dean.pendingSessions.some(
            (session) => {

                return Object.keys(session)[0] == sessionDate
            }
        );

        if (existingSession) {
            return res.status(400).json({ message: "Session already booked for this date" });
        }

        const sessionInfo = {
            [sessionDate]: studentId,
        };

        dean.pendingSessions.push(sessionInfo);

        await dean.save();

        res.status(200).json({ message: "Session booked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}