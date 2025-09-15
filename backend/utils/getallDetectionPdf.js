import FPDF from "node-fpdf";

export function generateDetectionsReport(detections) {
  const pdf = new FPDF("P", "mm", "A4");
  pdf.AddPage();

  // Title
  pdf.SetFont("Arial", "B", 16);
  pdf.Cell(0, 10, "Detections Report", 0, 1, "C");
  pdf.Ln(5);

  // Table headers
  pdf.SetFont("Arial", "B", 12);
  pdf.Cell(20, 10, "ID", 1, 0, "C");
  pdf.Cell(40, 10, "Camera", 1, 0, "C");
  pdf.Cell(45, 10, "Start Time", 1, 0, "C");
  pdf.Cell(45, 10, "End Time", 1, 0, "C");
  pdf.Cell(30, 10, "Duration", 1, 1, "C");

  // Table rows
  pdf.SetFont("Arial", "", 10);
  detections.forEach((det) => {
    pdf.Cell(20, 10, String(det.id), 1, 0, "C");
    pdf.Cell(40, 10, det.camera_id, 1, 0, "C");
    pdf.Cell(45, 10, new Date(det.detection_start_time).toLocaleString(), 1, 0, "C");
    pdf.Cell(45, 10, new Date(det.detection_end_time).toLocaleString(), 1, 0, "C");
    pdf.Cell(30, 10, det.duration.toFixed(2) + "s", 1, 1, "C");
  });

  // "S" → return string, then convert to Buffer for sending to frontend
  return Buffer.from(pdf.Output("S"), "binary");
}
