import mongoose, { Schema } from "mongoose";

const timeEntrySchema = new mongoose.Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: Date,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    totalTime: {
      type: Number,
    },
    status: {
        type: String,
        enum: ["running", "stopped", "paused", "resume", "completed"],
        default: "running"
    },
    sessions: [{
      startTime: Date,
      endTime: Date,
      duration: Number // minutes
    }]
  },
  { timestamps: true },
);

export const TimeEntry = mongoose.model("TimeEntry", timeEntrySchema);
