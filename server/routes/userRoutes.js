import express from "express";
import {
  guest,
  login,
  signup,
  updateProfile,
} from "../controllers/userControls.js";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/updateprofile", updateProfile);
router.get("/guest", guest);
