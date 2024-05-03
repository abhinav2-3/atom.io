import express from "express";
import {
  addConnection,
  addSkills,
  getActiveUser,
  getAllUsers,
  guest,
  login,
  removeConnection,
  signup,
  updateProfile,
  uploadAvatar,
} from "../controllers/userControls.js";

export const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/updateprofile", updateProfile);
router.post("/getusers", getAllUsers);
router.post("/getactiveuser", getActiveUser);
router.get("/guest", guest);
router.post("/addconnection", addConnection);
router.put("/removeconnection", removeConnection);
router.put("/addskills", addSkills);
router.put("/changeavatar", uploadAvatar);
// router.put("/updateinteraction", likeAndSaved);
