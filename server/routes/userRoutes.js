import express from "express";
import {
  addConnection,
  getAllUsers,
  guest,
  login,
  signup,
  updateProfile,
} from "../controllers/userControls.js";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/updateprofile", updateProfile);
router.post("/getusers", getAllUsers);
router.get("/guest", guest);
router.post("/addconnection", addConnection);
