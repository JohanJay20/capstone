import FPDF from "node-fpdf";

export function generateGroupedDetectionsReport(grouped, by = "month") {
  const pdf = new FPDF("P", "mm", "A4");
  pdf.AddPage();

  // Title
  pdf.SetFont("Arial", "B", 16);
  pdf.Cell(0, 10, `Grouped Detections Report (${by})`, 0, 1, "C");
  pdf.Ln(5);

  // Table headers
  pdf.SetFont("Arial", "B", 12);
  if (by === "week") {
    pdf.Cell(50, 10, "Week Start", 1, 0, "C");
    pdf.Cell(50, 10, "Week End", 1, 0, "C");
    pdf.Cell(40, 10, "Detections", 1, 1, "C");
  } else {
    pdf.Cell(70, 10, "Month", 1, 0, "C");
    pdf.Cell(40, 10, "Detections", 1, 1, "C");
  }

  // Table rows
  pdf.SetFont("Arial", "", 11);

  let total = 0;
  grouped.forEach(({ count, period, week_end }) => {
    total += Number(count) || 0;

    if (by === "week") {
      pdf.Cell(50, 10, String(period), 1, 0, "C");
      pdf.Cell(50, 10, String(week_end), 1, 0, "C");
      pdf.Cell(40, 10, String(count), 1, 1, "C");
    } else {
      pdf.Cell(70, 10, String(period), 1, 0, "C");
      pdf.Cell(40, 10, String(count), 1, 1, "C");
    }
  });

  // Total row
  pdf.SetFont("Arial", "B", 12);
  if (by === "week") {
    pdf.Cell(100, 10, "Total", 1, 0, "C");
    pdf.Cell(40, 10, String(total), 1, 1, "C");
  } else {
    pdf.Cell(70, 10, "Total", 1, 0, "C");
    pdf.Cell(40, 10, String(total), 1, 1, "C");
  }

  // Return Buffer
  return Buffer.from(pdf.Output("S"), "binary");
}
