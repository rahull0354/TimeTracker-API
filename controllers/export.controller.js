import { generateSummaryReport, getAllProjects, getAllTimeEntries, getProjecTimeEntries } from "../services/export.service.js"
import { convertToCSV } from "../utils/csvFormatter.js"
import { convertToExcel } from "../utils/excelFormatter.js"

// export all projects as csv
export const exportProjectsCSV = async (req, res) => {
    try {
        const {userId} = req.user

        // fetching data from service
        const data = await getAllProjects(userId)

        // convert to CSV
        const {csv, filename, mimetype} = convertToCSV(data, "projects")

        // send files as response
        res.setHeader("Content-Type", mimetype)
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (error) {
        console.error("Error exporting projects CSV: ", error);
        return res.status(500).json({
            message: "Error Exporting Projects",
            success: false
        })
    }
}

// export all projects as excel
export const exportProjectsExcel = async (req, res) => {
    try {
        const {userId} = req.user

        // fetch data from service
        const data = await getAllProjects(userId)

        // convert to excel
        const {buffer, filename, mimetype} = convertToExcel(data, "Projects", "projects")

        // send file as response
        res.setHeader("Content-Type", mimetype)
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)
        res.send(buffer)
    } catch (error) {
        console.error("Error exporting projects Excel: ", error);
        return res.status(500).json({
            message: "Error Exporting Projects",
            success: false
        })       
    }
}

// export all time entries as csv
export const exportTimeEntriesCSV = async (req, res) => {
    try {
        const {userId} = req.user

        const data = await getAllTimeEntries(userId)
        const {csv, filename, mimetype} = convertToCSV(data, "time_entries")

        res.setHeader("Content-Type", mimetype)
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (error) {
        console.error("Error exporting time entries CSV: ", error);
        return res.status(500).json({
            message: "Error Exporting Time Entries",
            success: false
        })
    }
}

// export all time entries as excel
export const exportTimeEntriesExcel = async (req, res) => {
    try {
        const {userId} = req.user

        const data = await getAllTimeEntries(userId)
        const {buffer, filename, mimetype} = convertToExcel(data, "Time Entries", "time_entries")

        res.setHeader("Content-Type", mimetype)
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)
        res.send(buffer)
    } catch (error) {
        console.error("Error exporting Time Entries Excel: ", error);
        return res.status(500).json({
            message: "Error Exporting Time Entries",
            success: false
        })
    }
}

// exporting specific time entries as csv
export const exportPojectTimeEntriesCSV = async (req, res) => {
    try {
        const {userId} = req.user
        const {projectId} = req.params

        const data = await getProjecTimeEntries(userId, projectId)
        const  {csv, filename, mimetype} = convertToCSV(data, `projecrt_${projectId}_time_entries`)

        res.setHeader("Content-Type", mimetype)
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)
        res.send(csv)
    } catch (error) {
        console.error("Error exporting project time entries CSV: ", error);
        return res.status(500).json({
            message: "Error Exporting Projects Time Entries",
            success: false
        })
    }
}

// export summary report as excel
export const exportSummaryReportExcel = async (req, res) => {
    try {
        const {userId} = req.user
        
        const data = await generateSummaryReport(userId)
        const {buffer, filename, mimetype} = convertToExcel(data, "Summary Report", "summary_report")

        res.setHeader("Content-Type", mimetype)
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`)
        res.send(buffer)
    } catch (error) {
        console.error("Error exporting summary report: ", error);
        return res.status(500).json({
            message: "Error Exporting summary report",
            success: false
        })
    }
}

