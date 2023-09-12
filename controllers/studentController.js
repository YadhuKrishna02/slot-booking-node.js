import User from "../models/User.js";
import Session from "../models/Session.js";

function convertToIST(date) {
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + ISTOffset);
    return istDate;
}

export const freeSessions = async (req, res) => {
    try {
        const slots = [];
        const deanId = req.params.deanId;

        const generateNext30DaysSlots = (() => {
            const today = new Date();
            const thirtyDaysFromNow = new Date(today);
            thirtyDaysFromNow.setDate(today.getDate() + 30);

            let currentDate = today;

            while (currentDate <= thirtyDaysFromNow) {
                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek === 4 || dayOfWeek === 5) {
                    const formattedDate = currentDate.toLocaleDateString('en-US', {
                        day: '2-digit',
                        weekday: 'short',
                        month: 'short',
                        year: 'numeric',
                    });
                    slots.push({ date: formattedDate });
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
            return slots;
        })();

        const dean = await User.findById(deanId);

        if (!dean || dean.role !== 'dean') {
            return res.status(404).json({ message: 'Dean not found' });
        }

        const bookedDates = await Session.find({
            deanId: deanId,
            status: 'pending',
        }).distinct('slotStartTime');

        const formattedBookedDates = bookedDates.map((date) =>
            new Date(date).toLocaleDateString('en-US', {
                day: '2-digit',
                weekday: 'short',
                month: 'short',
                year: 'numeric',
            })
        );

        const availableSlots = slots.filter((slot) => !formattedBookedDates.includes(slot.date));

        res.status(200).json({ message: 'Available slots fetched', availableSlots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};







export const bookSession = async (req, res) => {
    try {
        const deanId = req.params.deanId;
        const { sessionDate, studentId } = req.body;

        const dean = await User.findById(deanId);

        if (!dean || dean.role !== 'dean') {
            return res.status(404).json({ message: 'Dean not found' });
        }

        const sessionStartTime = new Date(sessionDate);
        sessionStartTime.setHours(10, 0, 0, 0);

        const ISTDate = convertToIST(sessionStartTime);

        const existingSession = await Session.findOne({
            slotStartTime: ISTDate,
            status: 'pending',
        });


        if (existingSession) {
            return res.status(400).json({ message: 'Dean is already booked for this date' });
        }

        const existingDeanSession = await Session.findOne({
            deanId: deanId,
            slotStartTime: ISTDate,
            status: 'pending',
        });

        if (existingDeanSession) {
            return res.status(400).json({ message: 'Dean is already booked for this date' });
        }

        // Create a new session
        const newSession = new Session({
            studentId: studentId,
            deanId: deanId,
            slotStartTime: ISTDate,
        });

        await newSession.save();

        const slotDate = ISTDate.toLocaleDateString('en-US', {
            day: '2-digit',
            weekday: 'short',
            month: 'short',
            year: 'numeric',
        });

        res.status(200).json({ message: 'Session booked successfully', slotDate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
