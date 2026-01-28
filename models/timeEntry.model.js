import mongoose from "mongoose";

const timeEntrySchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: [true, "Project is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
        min: [1, "Duration must be at least 1 minute"]
    },
    startTime: {
        type: Date,
        required: [true, "Start time is required"]
    },
    endTime: {
        type: Date,
        required: [true, "End time is required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    }
}, {timestamps: true})

export const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema);
