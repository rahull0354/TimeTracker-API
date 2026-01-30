import {
  generateSummaryReport,
  getAllProjects,
  getAllTimeEntries,
  getProjecTimeEntries,
  getTimeEntriesByDateRange,
} from "../services/export.service.js";
import { convertToCSV } from "../utils/csvFormatter.js";
import { convertToExcel } from "../utils/excelFormatter.js";
import fs from "fs";
import path from "path";

// export all projects as csv
export const exportProjectsCSV = async (req, res) => {
  try {
    const { userId } = req.user;

    // fetching data from service
    const data = await getAllProjects(userId);

    // convert to CSV
    const { csv, filename, mimetype } = convertToCSV(data, "projects");

    //saving the file to exports folder
    const filepath = path.join(process.cwd(), "exports", filename);
    fs.writeFileSync(filepath, csv);

    // send files as response
    res.setHeader("Content-Type", mimetype);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error("Error exporting projects CSV: ", error);
    return res.status(500).json({
      message: "Error Exporting Projects",
      success: false,
    });
  }
};

// export all projects as excel
export const exportProjectsExcel = async (req, res) => {
  try {
    const { userId } = req.user;

    // fetch data from service
    const data = await getAllProjects(userId);

    // convert to excel
    const { buffer, filename, mimetype } = convertToExcel(
      data,
      "Projects",
      "projects",
    );

    // saving the file to exports folder
    const filepath = path.join(process.cwd(), "exports", filename);
    fs.writeFileSync(filepath, buffer);

    // send file as response
    res.setHeader("Content-Type", mimetype);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting projects Excel: ", error);
    return res.status(500).json({
      message: "Error Exporting Projects",
      success: false,
    });
  }
};

// export all time entries as csv
export const exportTimeEntriesCSV = async (req, res) => {
  try {
    const { userId } = req.user;

    const data = await getAllTimeEntries(userId);
    const { csv, filename, mimetype } = convertToCSV(data, "time_entries");

    // saving the file to exports folder
    const filepath = path.join(process.cwd(), "exports", filename);
    fs.writeFileSync(filepath, csv);

    res.setHeader("Content-Type", mimetype);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error("Error exporting time entries CSV: ", error);
    return res.status(500).json({
      message: "Error Exporting Time Entries",
      success: false,
    });
  }
};

// export all time entries as excel
export const exportTimeEntriesExcel = async (req, res) => {
  try {
    const { userId } = req.user;

    const data = await getAllTimeEntries(userId);
    const { buffer, filename, mimetype } = convertToExcel(
      data,
      "Time Entries",
      "time_entries",
    );

    // saving the file to exports folder
    const filepath = path.join(process.cwd(), "exports", filename);
    fs.writeFileSync(filepath, buffer);

    res.setHeader("Content-Type", mimetype);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting Time Entries Excel: ", error);
    return res.status(500).json({
      message: "Error Exporting Time Entries",
      success: false,
    });
  }
};

// exporting specific time entries as csv
export const exportPojectTimeEntriesCSV = async (req, res) => {
  try {
    const { userId } = req.user;
    const { projectId } = req.params;

    const data = await getProjecTimeEntries(userId, projectId);
    const { csv, filename, mimetype } = convertToCSV(
      data,
      `project_${projectId}_time_entries`,
    );

    // saving the file to exports folder
    const filepath = path.join(process.cwd(), "exports", filename);
    fs.writeFileSync(filepath, csv);

    res.setHeader("Content-Type", mimetype);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (error) {
    console.error("Error exporting project time entries CSV: ", error);
    return res.status(500).json({
      message: "Error Exporting Projects Time Entries",
      success: false,
    });
  }
};

// export summary report as excel
export const exportSummaryReportExcel = async (req, res) => {
  try {
    const { userId } = req.user;

    const data = await generateSummaryReport(userId);
    const { buffer, filename, mimetype } = convertToExcel(
      data,
      "Summary Report",
      "summary_report",
    );

    // saving the file to exports folder
    const filepath = path.join(process.cwd(), "exports", filename);
    fs.writeFileSync(filepath, buffer);

    res.setHeader("Content-Type", mimetype);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting summary report: ", error);
    return res.status(500).json({
      message: "Error Exporting summary report",
      success: false,
    });
  }
};

export const exportTimeEntriesByDateRange = async (req, res) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate } = req.params;

    const data = await getTimeEntriesByDateRange(userId, startDate, endDate);
    const { buffer, filename, mimetype } = convertToExcel(
      data,
      "Time Entries By Date",
      "time_entries_by_date",
    );

    // saving the file to exports
    const filepath = path.join(process.cwd(), "exports", filename);
    fs.writeFileSync(filepath, buffer);

    res.setHeader("Content-Type", mimetype);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting Time Entries by Date report: ", error);
    return res.status(500).json({
      message: "Error Exporting Time Entries by Date",
      success: false,
    });
  }
};
