import express from "express"
import authenticateToken from "../middlewares/authenticateToken.js"
import { exportPojectTimeEntriesCSV, exportProjectsCSV, exportProjectsExcel, exportSummaryReportExcel, exportTimeEntriesCSV } from "../controllers/export.controller.js";

const router = express.Router()

router.get("/projects/csv", authenticateToken, exportProjectsCSV)
router.get("/projects/excel", authenticateToken, exportProjectsExcel)
router.get("/timeEntries/csv", authenticateToken, exportTimeEntriesCSV)
router.get("/timeEntries/excel", authenticateToken, exportProjectsExcel)

// export specific project
router.get("/projects/:projectId/csv", authenticateToken, exportPojectTimeEntriesCSV)

// export summary report
router.get("/summary/excel", authenticateToken, exportSummaryReportExcel)

export default router;