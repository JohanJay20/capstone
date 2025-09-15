import Detection from "../models/detectionModel.js";
import { Op,Sequelize } from "sequelize";
import { startOfWeek, endOfWeek } from "date-fns";


const getGroupedDetections = async (req, res) => {
  const { by = 'month' } = req.query;

  try {
    let grouped;

    switch (by.toLowerCase()) {
      case 'day':
        grouped = await Detection.findAll({
          attributes: [
            [
              Sequelize.literal(`TO_CHAR(detection_start_time + interval '8 hours', 'YYYY-MM-DD')`),
              'period'
            ],
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
          ],
          group: [Sequelize.literal(`TO_CHAR(detection_start_time + interval '8 hours', 'YYYY-MM-DD')`)],
          order: [[Sequelize.literal('period'), 'ASC']],
          raw: true
        });
        break;
// inside getGroupedDetections, for case 'week'
case 'week':
  grouped = await Detection.findAll({
    attributes: [
      [
        Sequelize.literal(
          `TO_CHAR(date_trunc('week', "detection_start_time" + interval '8 hours'), 'YYYY-MM-DD')`
        ),
        'period'
      ],
      [
        Sequelize.literal(
          `TO_CHAR(date_trunc('week', "detection_start_time" + interval '8 hours') + interval '6 days', 'YYYY-MM-DD')`
        ),
        'week_end'
      ],
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
    ],
    group: [
      Sequelize.literal(
        `TO_CHAR(date_trunc('week', "detection_start_time" + interval '8 hours'), 'YYYY-MM-DD')`
      ),
      Sequelize.literal(
        `TO_CHAR(date_trunc('week', "detection_start_time" + interval '8 hours') + interval '6 days', 'YYYY-MM-DD')`
      )
    ],
    order: [
      [
        Sequelize.literal(
          `TO_CHAR(date_trunc('week', "detection_start_time" + interval '8 hours'), 'YYYY-MM-DD')`
        ),
        'ASC'
      ]
    ],
    raw: true
  });
  break;


      case 'month':
        grouped = await Detection.findAll({
          attributes: [
            [
              Sequelize.literal(`TO_CHAR(detection_start_time + interval '8 hours', 'YYYY-MM')`),
              'period'
            ],
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
          ],
          group: [Sequelize.literal(`TO_CHAR(detection_start_time + interval '8 hours', 'YYYY-MM')`)],
          order: [[Sequelize.literal('period'), 'ASC']],
          raw: true
        });
        break;

      case 'year':
        grouped = await Detection.findAll({
          attributes: [
            [
              Sequelize.literal(`TO_CHAR(detection_start_time + interval '8 hours', 'YYYY')`),
              'period'
            ],
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
          ],
          group: [Sequelize.literal(`TO_CHAR(detection_start_time + interval '8 hours', 'YYYY')`)],
          order: [[Sequelize.literal('period'), 'ASC']],
          raw: true
        });
        break;

      default:
        return res.status(400).json({ message: "Invalid 'by' value. Use: day, week, month, year" });
    }

    res.json({ grouped });

  } catch (error) {
    console.error('Group fetch error:', error);
    res.status(500).json({ message: "Failed to group detections", error: error.message });
  }
};




const getDailyDetectionStats = async (req, res) => {
  try {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (d) => d.toISOString().split("T")[0];
    const todayStr = formatDate(today);
    const yesterdayStr = formatDate(yesterday);

    const todayCount = await Detection.count({
      where: Sequelize.where(
        Sequelize.literal(`TO_CHAR(detection_start_time + interval '8 hours', 'YYYY-MM-DD')`),
        todayStr
      ),
    });

    const yesterdayCount = await Detection.count({
      where: Sequelize.where(
        Sequelize.literal(`TO_CHAR(detection_start_time + interval '8 hours', 'YYYY-MM-DD')`),
        yesterdayStr
      ),
    });

    let change = 0;
    if (yesterdayCount !== 0) {
      change = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
    } else if (todayCount > 0) {
      change = 100;
    }

    return res.json({
      today: todayCount,
      yesterday: yesterdayCount,
      change: Math.round(change),
      isIncrease: change >= 0,
    });
  } catch (error) {
    console.error("Error fetching daily stats:", error);
    return res.status(500).json({
      message: "Failed to fetch daily stats",
      error: error.message,
    });
  }
};

const getWeeklyDetectionStats = async (req, res) => {
    try {
      const today = new Date();
  
      // Helper to format date to YYYY-MM-DD
      const formatDate = (d) => d.toISOString().split("T")[0];
  
      // Get start of this week (Monday) and last week
      const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay(); // 0 (Sun) to 6 (Sat)
        
        // If it's Sunday (0), go back 6 days to get to the previous Monday.
        // Otherwise, subtract the day number (i.e. Monday - 1, Tuesday - 2, ..., Saturday - 6)
        const diffToMonday = day === 0 ? 6 : day - 1;
  
        d.setDate(d.getDate() - diffToMonday);
        return new Date(d.setHours(0, 0, 0, 0)); // Set the time to midnight
      };
  
      const startOfThisWeek = getStartOfWeek(today);
      const endOfThisWeek = new Date(startOfThisWeek);
      endOfThisWeek.setDate(endOfThisWeek.getDate() + 6);
  
      const startOfLastWeek = new Date(startOfThisWeek);
      startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  
      const endOfLastWeek = new Date(startOfThisWeek);
      endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);
  
      const thisWeekCount = await Detection.count({
        where: {
          detection_start_time: {
            [Sequelize.Op.between]: [
              new Date(startOfThisWeek),
              new Date(endOfThisWeek.setHours(23, 59, 59, 999)),
            ],
          },
        },
      });
  
      const lastWeekCount = await Detection.count({
        where: {
          detection_start_time: {
            [Sequelize.Op.between]: [
              new Date(startOfLastWeek),
              new Date(endOfLastWeek.setHours(23, 59, 59, 999)),
            ],
          },
        },
      });
  
      // Calculate change %
      let change = 0;
      if (lastWeekCount !== 0) {
        change = ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100;
      } else if (thisWeekCount > 0) {
        change = 100;
      }
  
      return res.json({
        thisWeek:      thisWeekCount,
        lastWeek:      lastWeekCount,
        change: Math.round(change),
        isIncrease:    change >= 0,
      });
    } catch (error) {
      console.error("Error fetching weekly stats:", error);
      return res.status(500).json({
        message: "Failed to fetch weekly stats",
        error:   error.message,
      });
    }
  };
  
  const getMonthlyDetectionStats = async (req, res) => {
    try {
      const today = new Date();
  
      // Get the first and last day of a given month
      const getStartOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
      const getEndOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  
      const startOfThisMonth = getStartOfMonth(today);
      const endOfThisMonth = getEndOfMonth(today);
  
      const startOfLastMonth = new Date(startOfThisMonth);
      startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
      const endOfLastMonth = getEndOfMonth(startOfLastMonth);
  
      const thisMonthCount = await Detection.count({
        where: {
          detection_start_time: {
            [Sequelize.Op.between]: [startOfThisMonth, endOfThisMonth],
          },
        },
      });
  
      const lastMonthCount = await Detection.count({
        where: {
          detection_start_time: {
            [Sequelize.Op.between]: [startOfLastMonth, endOfLastMonth],
          },
        },
      });
  
      // Calculate percentage change
      let change = 0;
      if (lastMonthCount !== 0) {
        change = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
      } else if (thisMonthCount > 0) {
        change = 100;
      }
  
      return res.json({
        thisMonth:   thisMonthCount,
        lastMonth:   lastMonthCount,
        change: Math.round(change),
        isIncrease:  change >= 0,
      });
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
      return res.status(500).json({
        message: "Failed to fetch monthly stats",
        error:   error.message,
      });
    }
  };
const getWeekdayDetections = async (req, res) => {
  try {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(now, { weekStartsOn: 1 });     // Sunday

    const caseExpr = `
      CASE 
        WHEN EXTRACT(DOW FROM detection_start_time + interval '8 hours') = 0 THEN 'Sunday'
        WHEN EXTRACT(DOW FROM detection_start_time + interval '8 hours') = 1 THEN 'Monday'
        WHEN EXTRACT(DOW FROM detection_start_time + interval '8 hours') = 2 THEN 'Tuesday'
        WHEN EXTRACT(DOW FROM detection_start_time + interval '8 hours') = 3 THEN 'Wednesday'
        WHEN EXTRACT(DOW FROM detection_start_time + interval '8 hours') = 4 THEN 'Thursday'
        WHEN EXTRACT(DOW FROM detection_start_time + interval '8 hours') = 5 THEN 'Friday'
        WHEN EXTRACT(DOW FROM detection_start_time + interval '8 hours') = 6 THEN 'Saturday'
      END
    `;

    const orderExpr = `
      CASE 
        WHEN ${caseExpr} = 'Monday' THEN 1
        WHEN ${caseExpr} = 'Tuesday' THEN 2
        WHEN ${caseExpr} = 'Wednesday' THEN 3
        WHEN ${caseExpr} = 'Thursday' THEN 4
        WHEN ${caseExpr} = 'Friday' THEN 5
        WHEN ${caseExpr} = 'Saturday' THEN 6
        WHEN ${caseExpr} = 'Sunday' THEN 7
      END
    `;

    const weekdays = await Detection.findAll({
      attributes: [
        [Sequelize.literal(caseExpr), 'weekday'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: {
        detection_start_time: {
          [Op.between]: [start, end],
        },
      },
      group: [Sequelize.literal(caseExpr)],
      order: Sequelize.literal(orderExpr),
      raw: true,
    });

    return res.json({ weekdays });
  } catch (error) {
    console.error("Error fetching weekday detections:", error);
    return res.status(500).json({
      message: "Failed to fetch weekday detection stats",
      error: error.message,
    });
  }
};


  export {
     getWeekdayDetections,
      getGroupedDetections,
      getDailyDetectionStats,
      getWeeklyDetectionStats,
      getMonthlyDetectionStats
  };