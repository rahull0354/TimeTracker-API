import express from "express"
import authenticateToken from "../middlewares/authenticateToken.js";
import { pauseTimer, resumeTimer, startTimeEntry, stopTimeEntry } from "../controllers/timeEntry.controller.js";

const router = express.Router()

router.post("/:projectId/start", authenticateToken, startTimeEntry)
router.put("/stop/:timeEntryId", authenticateToken, stopTimeEntry)
router.put("/pause/:timeEntryId", authenticateToken, pauseTimer)
router.put("/resume/:timeEntryId", authenticateToken, resumeTimer)

export default router