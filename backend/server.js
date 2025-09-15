import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import detectionRoutes from "./routes/detectionRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";   // <-- import

import db from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/detections", detectionRoutes);
app.use("/reports", pdfRoutes);   // <-- mount under /reports

const PORT = process.env.PORT || 5001;
db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
 