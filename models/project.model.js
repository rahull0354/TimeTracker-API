import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    clientName: {
      type: String,
      trim: true,
    },
    hourlyRate: {
      type: Number,
      min: [0, "Hourly rate cannot be negative"],
    },
    status: {
      type: String,
      enum: ["active", "completed", "archived", "hold"],
      default: "active",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
