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

    await User.findOneAndUpdate(
      { username },
      { $push: { posts: user._id } },
      { new: true }
    );

    return res.status(201).json({ success: true, msg: "Post Created" });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};

export const userPost = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "User detail is not Correct" });
  try {
    const user = await User.findById(id);
    if (!user) return res.status(401).json({ error: "User Doesn't Exist" });

    const posts = await Post.find({
      postedBy: id,
    });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};

export const feed = async (req, res) => {
  try {
    const feedPosts = await Post.find();

    const sortedPost = feedPosts.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json({ success: true, sortedPost });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};

export const likeAndSaved = async (req, res) => {
  const { postId, button, userId } = req.body;
  const actionMap = {
    like: { $addToSet: { likes: userId } },
    save: { $addToSet: { saved: userId } },
    dislike: { $pull: { likes: userId } },
    unsave: { $pull: { saved: userId } },
    default: { $inc: { comments: 1 } }, // Increment comments count for other actions
  };

  // Get the update operation based on the button action
  const updateField = actionMap[button] || actionMap.default;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, updateField, {
      new: true,
    });
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
    return res.status(200).json({ success: true, message: "Post Deleted" });
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
      id,
      {
        post: input,
      },
      { new: true }
    );
    return res.status(201).json({ success: true, message: "Post Updated" });
  } catch (error) {
    handlerErrors(error, res, 500, "Internal Server Error");
  }
};
