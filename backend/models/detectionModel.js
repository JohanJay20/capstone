// models/detectionModel.js

import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Detection = db.define('Detection', {
    track_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detection_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    detection_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    camera_id: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'detections',
    timestamps: false
});

export default Detection;
