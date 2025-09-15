import Detection from "../models/detectionModel.js";
import { sendNotificationToAllUsers } from '../utils/mailer.js';
import User from '../models/user.js';

// Helper to format dates
function formatToReadable(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return null;

    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);

    let hours = date.getHours();
    const minutes = (`0${date.getMinutes()}`).slice(-2);
    const seconds = (`0${date.getSeconds()}`).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    const hourStr = (`0${hours}`).slice(-2);

    return `${year}-${month}-${day} ${hourStr}:${minutes}:${seconds} ${ampm}`;
}

// Get all detections
const getAllDetections = async (req, res) => {
    try {
        const detections = await Detection.findAll();

        const formatted = detections.map(detection => ({
            ...detection.toJSON(),
            detection_start_time: formatToReadable(detection.detection_start_time),
            detection_end_time: formatToReadable(detection.detection_end_time),
        }));

        res.json({ detections: formatted });
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get detection by ID
const getDetectionById = async (req, res) => {
    try {
        const detection = await Detection.findByPk(req.params.id);
        if (!detection) {
            return res.status(404).json({ message: "Detection not found" });
        }

        detection.detection_start_time = formatToReadable(detection.detection_start_time);
        detection.detection_end_time = formatToReadable(detection.detection_end_time);

        res.json({ detection });
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Create or update detection
const createOrUpdateDetection = async (req, res) => {
    const { track_id, detection_start_time, detection_end_time, camera_id } = req.body;

    if (!track_id || !detection_start_time || !detection_end_time || !camera_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const startTime = new Date(detection_start_time);
    const endTime = new Date(detection_end_time);

    if (isNaN(startTime) || isNaN(endTime)) {
        console.error("Invalid dates:", startTime, endTime);
        return res.status(400).json({ error: "Invalid date format" });
    }

    const duration = Math.round((endTime - startTime) / 1000);

    if (duration <= 0) {
        return res.status(400).json({ error: "Duration cannot be zero or negative" });
    }

    try {
        const existingDetection = await Detection.findOne({
            where: { track_id, camera_id },
            order: [['detection_start_time', 'DESC']],
        });

        if (existingDetection) {
            existingDetection.detection_end_time = detection_end_time;
            existingDetection.duration = duration;
            await existingDetection.save();

            return res.status(200).json({
                message: "Detection updated",
                track_id,
                camera_id,
                duration,
            });
        } else {
            const newDetection = await Detection.create({
                track_id,
                camera_id,
                detection_start_time,
                detection_end_time,
                duration,
            });

            const users = await User.findAll();
            const emailList = users.map(user => user.email);

            await sendNotificationToAllUsers(
                '🚨 New Detection Created',
                `A new detection has been created.\n\nTrack ID: ${track_id}\nCamera: ${camera_id}\nStart: ${startTime.toLocaleString()}\nEnd: ${endTime.toLocaleString()}\nDuration: ${duration} seconds`,
                emailList
            );

            return res.status(201).json({
                message: "Detection created",
                track_id,
                camera_id,
                duration,
            });
        }
    } catch (error) {
        console.error('Create or Update error:', error);
        res.status(500).json({ message: "Failed to create or update detection" });
    }
};

// Get detections by camera
const getDetectionsByCamera = async (req, res) => {
    const { camera_id } = req.params;

    try {
        const detections = await Detection.findAll({
            where: { camera_id },
            order: [['detection_start_time', 'DESC']],
        });

        const formatted = detections.map(detection => ({
            ...detection.toJSON(),
            detection_start_time: formatToReadable(detection.detection_start_time),
            detection_end_time: formatToReadable(detection.detection_end_time),
        }));

        res.json({ detections: formatted });
    } catch (error) {
        console.error('Camera filter error:', error);
        res.status(500).json({ message: "Failed to fetch detections by camera" });
    }
};

export {
    getAllDetections,
    getDetectionById,
    createOrUpdateDetection,
    getDetectionsByCamera,
};
