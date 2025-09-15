import express from "express";
import {
    getAllDetections,
    getDetectionById,
    createOrUpdateDetection,
    
} from "../controllers/detectionController.js";
import {
   
    getGroupedDetections,
    getDailyDetectionStats,
    getWeeklyDetectionStats,
    getMonthlyDetectionStats,
    getWeekdayDetections
} from "../controllers/detectionAnalytics.js";

const router = express.Router();

router.get("/", getAllDetections);
router.post("/", createOrUpdateDetection);
router.get("/daily-stats", getDailyDetectionStats);
router.get("/weekdays", getWeekdayDetections);
router.get("/grouped", getGroupedDetections);
router.get('/stats/weekly', getWeeklyDetectionStats);
router.get('/stats/monthly',  getMonthlyDetectionStats);
router.get("/:id", getDetectionById);


export default router;
