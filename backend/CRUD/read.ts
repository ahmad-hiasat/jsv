import express from "express";
import data from "../database/data";
const router = express.Router();
router.get("/", async (req, res, next) => {
    try {
        const userId = (req.session as any).userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userData = await data.find({ userID: userId });
        return res.status(200).json(userData);
    } catch (e) {
        next(e);
    }
});
export default router;
