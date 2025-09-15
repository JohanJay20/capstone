import Detection from './models/detectionModel.js';
import { faker } from '@faker-js/faker';
import db from './config/db.js';

// Configuration
const CONFIG = {
    START_DATE: new Date(2025, 0, 14), // Jan 20, 2025
    END_DATE: new Date(2026, 8, 25),   // Apr 27, 2025
    TOTAL_DETECTIONS: 500,
    CAMERA_IDS: ['cam-001', 'cam-002', 'cam-003', 'cam-004'] // Define your camera IDs
};

// Generate a random date between two dates
function getRandomDateInRange(startDate, endDate) {
    const start = startDate.getTime();
    const end = endDate.getTime();
    return new Date(start + Math.random() * (end - start));
}

// Helper function to generate random times on a given date
function getRandomTimeOnDate(date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const randomTime = Math.floor(
        Math.random() * (endOfDay.getTime() - startOfDay.getTime())
    ) + startOfDay.getTime();

    return new Date(randomTime);
}

// Get random camera ID from configured list
function getRandomCameraId() {
    return CONFIG.CAMERA_IDS[
        Math.floor(Math.random() * CONFIG.CAMERA_IDS.length)
    ];
}

async function seedDetectionsInRange() {
    const detections = [];

    for (let i = 0; i < CONFIG.TOTAL_DETECTIONS; i++) {
        const randomDate = getRandomDateInRange(CONFIG.START_DATE, CONFIG.END_DATE);
        const detection_start_time = getRandomTimeOnDate(randomDate);
        const detection_end_time = new Date(
            detection_start_time.getTime() +
            Math.floor(Math.random() * (3600 * 1000 * 5)) // 0–5 hours duration
        );
        const duration = Math.round(
            (detection_end_time - detection_start_time) / 1000
        );

        detections.push({
            track_id: faker.string.uuid(),
            detection_start_time,
            detection_end_time,
            duration,
            camera_id: getRandomCameraId() // Add random camera ID
        });
    }

    try {
        await Detection.bulkCreate(detections);
        console.log(`✅ Successfully seeded ${CONFIG.TOTAL_DETECTIONS} detections across ${CONFIG.START_DATE.toDateString()} – ${CONFIG.END_DATE.toDateString()}`);
        console.log(`📷 Cameras used: ${CONFIG.CAMERA_IDS.join(', ')}`);
    } catch (error) {
        console.error('❌ Error seeding detections:', error);
    } finally {
        await db.close();
    }
}

seedDetectionsInRange();