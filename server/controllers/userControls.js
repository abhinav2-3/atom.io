import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = "dev_iobackend";

export const signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password || password.length < 7)
    return res.status(400).json({ error: "All fields are required" });

  try {
    let user = await User.findOne({ email });
    const existUsername = await User.findOne({ username });

    if (user || existUsername)
      return res.status(401).json({ error: "User already Exist!!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const authToken = jwt.sign({ userId: user._id }, SECRET_KEY);

    return res
      .cookie("token", authToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .status(201)
      .json({
        success: true,
        authToken,
        user,
        message: "Registered Successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: "User does not Exist!!" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: "Password is Invalid" });

    const authToken = jwt.sign({ userId: user._id }, SECRET_KEY);

    return res
      .cookie("token", authToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .status(201)
      .json({ success: true, authToken, user, message: "Logged In" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { expiresIn: new Date(Date.now()) })
    .json({
      message: "user logged out successfully.",
      success: true,
    });
};

export const updateProfile = async (req, res) => {
  const { name, username, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "Email does not Exist!!" });

    if (username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername)
        return res.status(400).json({ error: "Username already exists" });
    }

    await User.findOneAndUpdate(
      { email },
      {
        name,
        username,
      },
      { new: true }
    );

    user = await User.findOne({ email });

    return res
      .status(201)
      .json({ success: true, message: "Profile Updated", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const guest = async (req, res) => {
  const username = "guest_1";
  const password = "testuser";
  try {
    let user = await User.findOne({ username });

    if (!user) return res.status(400).json({ error: "User does not Exist!!" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: "Password is Invalid" });

    const authToken = jwt.sign({ userId: user._id }, SECRET_KEY);

    return res
      .cookie("token", authToken, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .status(201)
      .json({ success: true, authToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  const { id } = req.body;
  try {
    const users = await User.find();
    const newUsers = users.filter((user) => user._id.toString() !== id);
    return res.status(200).json({ success: true, newUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getActiveUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addConnection = async (req, res) => {
  const { userId, secondUserId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { connections: secondUserId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "Unable To Add" });
    return res.status(201).json({ success: true, message: "Connection Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addSkills = async (req, res) => {
  const { userId, skills } = req.body;
  try {
    let user = await User.findByIdAndUpdate(userId, { skills }, { new: true });

    if (!user) return res.status(404).json({ error: "Unable To Add" });

    user = await User.findById(userId);

    return res
      .status(201)
      .json({ success: true, message: "Skills are Added", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadAvatar = async (req, res) => {
  const { image, userId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: image },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "Unable to Update" });
    return res
      .status(200)
      .json({ success: true, message: "Avatar Updated", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
