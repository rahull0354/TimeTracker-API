import express from "express"
import { createProject } from "../controllers/project.controller.js"
import authenticateToken from "../middlewares/authenticateToken.js"

const router = express.Router()

router.post("/createProject", authenticateToken, createProject)

export default router