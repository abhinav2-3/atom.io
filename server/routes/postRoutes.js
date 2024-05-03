import express from "express";
import {
  createPost,
  deletePost,
  feed,
  likeSaveCount,
  postById,
  updatePost,
  userPost,
} from "../controllers/postControls.js";
import { likeAndSaved } from "../controllers/userControls.js";

export const postRouter = express.Router();

postRouter.post("/createpost", createPost);
postRouter.get("/feedposts", feed);
postRouter.get("/getpost/:id", postById);
postRouter.post("/userposts", userPost);
postRouter.put("/updateinteraction", likeAndSaved);
postRouter.put("/likesavecount", likeSaveCount);
postRouter.post("/deletepost", deletePost);
postRouter.put("/updatepost", updatePost);
