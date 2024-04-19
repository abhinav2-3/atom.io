import express from "express";
import {
  createPost,
  deletePost,
  feed,
  likeAndSaved,
  updatePost,
  userPost,
} from "../controllers/postControls.js";

export const postRouter = express.Router();

postRouter.post("/createpost", createPost);
postRouter.get("/feedposts", feed);
postRouter.post("/userposts", userPost);
postRouter.post("/updateinteraction", likeAndSaved);
postRouter.post("/deletepost", deletePost);
postRouter.put("/updatepost", updatePost);
