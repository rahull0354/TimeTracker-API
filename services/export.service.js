import { Project } from "../models/project.model.js";
import {TimeEntry} from "../models/timeEntry.model.js"

// fetching all the projects for export
export const getAllProjects = async (userId) => {
  const projects = await Project.find({ userId })
    .select("name description clientName hourlyRate status createdAt")
    .lean();

    return projects.map(project => ({
        "Project Name": project.name,
        "Project Description": project.description || "",
        "Client Name": project.clientName,
        "Hourly Rate": project.hourlyRate,
        "Project Status": project.status,
        "Created On": new Date(project.createdAt).toLocaleDateString(),
    }))
};

// fetching all time entries for a user
export const getAllTimeEntries = async (userId) => {
    const timeEntries = await TimeEntry.find({userId})
    .populate("projectId", "name")
    .lean()

    return timeEntries.map(entry => ({
        "Project": entry.projectId?.name || "NA",
        "Description": entry.description,
        "Date": new Date(entry.date).toLocaleDateString(),
        "Start Time": new Date(entry.startTime).toLocaleDateString(),
        "End Time": entry.endTime ? new Date(entry.endTime).toLocaleDateString() : "Running",
        "Total Minutes": entry.totalTime || 0,
        "Status": entry.status
    }))
}

// fetch time entries for a specific project
export const getProjecTimeEntries = async (userId, projectId) => {
    const timeEntries = await TimeEntry.find({userId, projectId})
    .populate("projectId", "name")
    .lean()

    return timeEntries.map(entry => ({
        "Description": entry.description,
        "Date": new Date(entry.date).toLocaleDateString(),
        "Start Time": new Date(entry.startTime).toLocaleDateString(),
        "End Time": entry.endTime ? new Date(entry.endTime).toLocaleDateString() : "Running",
        "Total Minutes": entry.totalTime || 0,
        "Status": entry.status
    }))
}

// fetch time entries within a date range
export const getTimeEntriesByDateRange = async (userId, startDate, endDate) => {
    const timeEntries = await TimeEntry.find({
        userId,
        date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        }
    })
    .populate("projectId", "name")
    .lean()

    return timeEntries.map(entry => ({
        "Project": entry.projectId?.name || "NA",
        "Description": entry.description,
        "Date": new Date(entry.date).toLocaleDateString(),
        "Start Time": new Date(entry.startTime).toLocaleDateString(),
        "End Time": entry.endTime ? new Date(entry.endTime).toLocaleDateString() : "Running",
        "Total Minutes": entry.totalTIme || 0,
        "Status": entry.status,
    }))
}

// generate summary report
export const generateSummaryReport = async (userId) => {
    const projects = await Project.find({userId}).lean()

    const report = []

    for (const project of projects) {
        const timeEntries = await TimeEntry.find({projectId: project._id}).lean()

        const totalSessions = timeEntries.reduce((sum, entry) => sum + (entry.sessions?.length || 0), 0)
        const totalTime = timeEntries.reduce((sum, entry) => sum + (entry.totalTime || 0), 0)

        report.push({
            "Project Name": project.name,
            "Description": project.description || "",
            "Total Sessions": totalSessions,
            "Total Minutes": totalTime,
            "Total Hours": (totalTime / 60).toFixed(2),
        })
    }

    return report
}