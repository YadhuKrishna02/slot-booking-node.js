import Session from "../models/Session.js";
import User from "../models/User.js";
export const viewPendingSessions = async (req, res) => {
    try {
        const deanId = req.params.id;

        const dean = await User.findById(deanId);

        if (!dean || dean.role !== 'dean') {
            return res.status(404).json({ message: 'Dean not found' });
        }

        const currentDate = new Date();

        const sessionsGreaterThanCurrent = await Session.find({
            deanId: deanId,
            status: 'pending',
            slotStartTime: { $gt: currentDate },
        }).select('slotStartTime studentId');

        if (sessionsGreaterThanCurrent.length === 0) {
            return res.status(200).json({ message: 'No pending sessions left' });
        }

        const pendingSessions = sessionsGreaterThanCurrent.map(session => ({
            slotStartTime: session.slotStartTime.toLocaleDateString('en-US', {
                day: '2-digit',
                weekday: 'short',
                month: 'short',
                year: 'numeric',
            }),
            studentId: session.studentId,
        }));

        res.status(200).json({ message: 'Pending sessions fetched', pendingSessions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
