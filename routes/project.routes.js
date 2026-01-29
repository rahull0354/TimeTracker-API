import express from "express";
import {
  changeStatusOfProject,
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers/project.controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/createProject", authenticateToken, createProject);
router.put("/updateProject/:id", authenticateToken, updateProject);
router.delete("/deleteProject/:id", authenticateToken, deleteProject);
router.get("/myProjects/", authenticateToken, getAllProjects);
router.put("/changeStatus/:id", authenticateToken, changeStatusOfProject);

export default router;
