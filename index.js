import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js"
import timeEntryRoutes from "./routes/timeEntry.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "Error Connecting to MongoDB";

app.use(express.json());

try {
  mongoose.connect(MONGO_URI);
  console.info("Connected to MongoDB");
} catch (error) {
  console.error("Error: ", error);
}

app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes)
app.use("/api/timeEntry", timeEntryRoutes)

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});