import aggregateClass from "../services/weekly.aggregate.services.js";

const aggregateServ = new aggregateClass();

export const getAggregate = async (req, res, next) => {
    try {
        const now = new Date();
        const weekStart = new Date();
        weekStart.setDate(now.getDate() - 7);
        weekStart.setHours(0, 0, 0, 0); // start of week
        const weekEnd = new Date();
        weekEnd.setHours(23, 59, 59, 999); // end of week

        const result = await aggregateServ.getWeeklyLogs(weekStart, weekEnd)

        res.status(200).json({metrics: result, success: true})
    } catch (error) {
        next(error)
    }
    
}