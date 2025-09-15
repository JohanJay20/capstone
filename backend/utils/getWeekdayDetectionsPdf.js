import FPDF from "node-fpdf";

export function generateWeekdayDetectionsReport(weekdays) {
  const pdf = new FPDF("P", "mm", "A4");
  pdf.AddPage();

  // Title
  pdf.SetFont("Arial", "B", 16);
  pdf.Cell(0, 10, "Weekday Detections Report", 0, 1, "C");
  pdf.Ln(5);

  // Table headers
  pdf.SetFont("Arial", "B", 12);
  pdf.Cell(60, 10, "Weekday", 1, 0, "C");
  pdf.Cell(60, 10, "Detections Count", 1, 1, "C");

  // Ensure all weekdays are present
  const allWeekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Convert weekdays array into a map for quick lookup
  const weekdayMap = weekdays.reduce((acc, row) => {
    acc[row.weekday] = row.count;
    return acc;
  }, {});

  let total = 0;

  pdf.SetFont("Arial", "", 12);
  allWeekdays.forEach((day) => {
    const count = weekdayMap[day] || 0;
    total += Number(count) || 0;  // Convert to number before adding

    pdf.Cell(60, 10, day, 1, 0, "C");
    pdf.Cell(60, 10, String(count), 1, 1, "C");
  });

  // Add total row
  pdf.SetFont("Arial", "B", 12);
  pdf.Cell(60, 10, "Total", 1, 0, "C");
  pdf.Cell(60, 10, String(total), 1, 1, "C");

  // return buffer
  return Buffer.from(pdf.Output("S"), "binary");
}
