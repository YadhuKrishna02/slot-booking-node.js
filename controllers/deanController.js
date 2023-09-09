import Dean from "../models/Dean.js";

export const viewPendingSessions = async (req, res) => {
    try {
        const deanId = req.params.id;

        const dean = await Dean.findById(deanId);

        if (!dean) {
            return res.status(404).json({ message: "Dean not found" });
        }

        const currentDate = new Date();
        const currentHour = currentDate.getHours();

        const pendingSessions = dean.pendingSessions
            .filter((pendingDate) => {
                const sessionDate = new Date(Object.keys(pendingDate)[0]);

                return sessionDate > currentDate || currentHour < 10
            })
            .map((pendingDate) => {
                const sessionDate = Object.keys(pendingDate)[0];
                const studentId = Object.values(pendingDate)[0];
                return { sessionDate, studentId };
            });

        res.status(200).json({ message: 'Pending sessions fetched', pendingSessions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}