import express from "express";
import { generateDetectionsReport } from "../utils/getallDetectionPdf.js";
import { generateGroupedDetectionsReport } from "../utils/getGroupedDetectionPdf.js";
import { generateWeekdayDetectionsReport } from "../utils/getWeekdayDetectionsPdf.js";
import Detection from "../models/detectionModel.js";
import { Op, Sequelize } from "sequelize";
import { startOfWeek, endOfWeek } from "date-fns";


const router = express.Router();

// all detections
router.get("/download-report/allDetection", async (req, res) => {
  try {
    const detections = await Detection.findAll({ raw: true });

    if (!detections || detections.length === 0) {
      return res.status(404).json({ message: "No detections found" });
    }

    const pdfBuffer = generateDetectionsReport(detections);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ Error generating PDF:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
});

// grouped detections (week/month)
router.get("/download-report/grouped", async (req, res) => {
  const { by = "month" } = req.query;

  try {
    let grouped;

   if (by === "week") {
  grouped = await Detection.findAll({
    attributes: [
      [
        Sequelize.literal(`(date_trunc('week', detection_start_time AT TIME ZONE 'UTC' + INTERVAL '8 hours'))::date`),
        "period"
      ],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      [
        Sequelize.literal(`((date_trunc('week', detection_start_time AT TIME ZONE 'UTC' + INTERVAL '8 hours'))::date + INTERVAL '6 days')::date`),
        "week_end"
      ],
    ],
    group: ["period"],
    order: [["period", "ASC"]],
    raw: true,
  });
} else if (by === "month") {
  grouped = await Detection.findAll({
    attributes: [
      [
        Sequelize.literal(`TO_CHAR(detection_start_time AT TIME ZONE 'UTC' + INTERVAL '8 hours', 'YYYY-MM')`),
        "period"
      ],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
    ],
    group: [Sequelize.literal(`TO_CHAR(detection_start_time AT TIME ZONE 'UTC' + INTERVAL '8 hours', 'YYYY-MM')`)],
    order: [[Sequelize.literal("period"), "ASC"]],
    raw: true,
  });
}else {
      return res.status(400).json({ message: "Invalid 'by' value. Use: week or month" });
    }

    if (!grouped || grouped.length === 0) {
      return res.status(404).json({ message: "No grouped detections found" });
    }

    const pdfBuffer = generateGroupedDetectionsReport(grouped, by);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=grouped_detections_${by}.pdf`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ Error generating grouped PDF:", err);
    res.status(500).json({ message: "Failed to generate grouped PDF" });
  }
});

router.get("/download-report/weekdays", async (req, res) => {
  try {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(now, { weekStartsOn: 1 }); // Sunday

    const weekdays = await Detection.findAll({
      attributes: [
        [
          Sequelize.literal(`
  CASE EXTRACT(DOW FROM detection_start_time + INTERVAL '8 hours')
    WHEN 0 THEN 'Sunday'
    WHEN 1 THEN 'Monday'
    WHEN 2 THEN 'Tuesday'
    WHEN 3 THEN 'Wednesday'
    WHEN 4 THEN 'Thursday'
    WHEN 5 THEN 'Friday'
    WHEN 6 THEN 'Saturday'
  END
`)
          ,
          "weekday",
        ],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      where: {
        detection_start_time: {
          [Op.between]: [start, end],
        },
      },
      group: ["weekday"],
      raw: true,
    });

    const pdfBuffer = generateWeekdayDetectionsReport(weekdays);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=weekday_detections.pdf"
    );
    res.send(pdfBuffer);
  } catch (err) {
    console.error("❌ Error generating weekday PDF:", err);
    res
      .status(500)
      .json({ message: "Failed to generate weekday detections PDF" });
  }
});

export default router;
