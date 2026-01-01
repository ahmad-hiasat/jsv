import express from "express";
import data from "../database/data";
const router = express.Router();
router.post("/", async (req, res, next) => {
    try {
        const body = req.body as {
            studentGpa: number;
            studentName: string;
            studentID: string;
        };
        const userId = (req.session as any).userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const newData = new data({
            studentGpa: body.studentGpa,
            studentName: body.studentName,
            studentID: body.studentID,
            user: userId,
        });
        await newData.save();
        return res.status(201).json(newData);
    } catch (e) {
        next(e);
    }
});

export default router;
