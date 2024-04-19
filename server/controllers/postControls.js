import User from "../models/userModels.js";
import Post from "../models/postModels.js";
import { handlerErrors } from "../utils/errors.js";

export const createPost = async (req, res) => {
  const { username, post } = req.body;
  if (!username || !post)
    return res.status(400).json({ error: "Input Fields is required" });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "User Doesn't Exist" });
    await Post.create({
      postedBy: user._id,
      post,
      username,
      name: user.name,
    });
    return res.status(201).json({ success: true, msg: "Post Created" });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};

export const userPost = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "User detail is not Correct" });
  try {
    const user = await User.findById({ _id: id });
    if (!user) return res.status(401).json({ error: "User Doesn't Exist" });

    const posts = await Post.find({
      postedBy: id,
    });

    return res.status(201).json({ success: true, posts });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};

export const feed = async (req, res) => {
  try {
    const feedPosts = await Post.find();

    return res.status(200).json({ success: true, feedPosts });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};

export const likeAndSaved = async (req, res) => {
  const { postId, button } = req.body;
  let updateField = {};

  switch (button) {
    case "like":
      updateField = { likes: 1 };
      break;
    case "save":
      updateField = { saved: 1 };
      break;
    default:
      updateField = { comments: 1 };
      break;
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: updateField },
      { new: true }
    );
    return res.status(201).json({ success: true, updatedPost });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.body;
  try {
    const postId = await Post.findById({ _id: id });
    if (!postId)
      return res
        .status(404)
        .json({ error: "Post is not avialable of this ID" });

    await Post.findByIdAndDelete({ _id: id });
    return res.status(201).json({ success: true });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};

export const updatePost = async (req, res) => {
  const { id, input } = req.body;
  try {
    const postId = await Post.findById({ _id: id });
    if (!postId)
      return res
        .status(404)
        .json({ error: "Post is not avialable of this ID" });

    await Post.findByIdAndUpdate(
      { _id: id },
      {
        post: input,
      },
      { new: true }
    );
    return res.status(201).json({ success: true });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};
