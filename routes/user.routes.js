import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getAllUsers", getAllUsers)

// middleware protected routes
router.put("/update/:id", authenticateToken, updateUser);
router.delete("/delete/:id", authenticateToken, deleteUser);
router.get("/profile/:id", authenticateToken, getSingleUser);

export default router;
