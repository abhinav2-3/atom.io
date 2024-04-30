import express from "express";
import {
  createPost,
  deletePost,
  feed,
  likeAndSaved,
  postById,
  updatePost,
  userPost,
} from "../controllers/postControls.js";

export const postRouter = express.Router();

postRouter.post("/createpost", createPost);
postRouter.get("/feedposts", feed);
postRouter.get("/getpost/:id", postById);
postRouter.post("/userposts", userPost);
postRouter.put("/updateinteraction", likeAndSaved);
postRouter.post("/deletepost", deletePost);
postRouter.put("/updatepost", updatePost);
