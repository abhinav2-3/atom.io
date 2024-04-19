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
      .json({ success: true, authToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
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
      .json({ success: true, authToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { name, username, email, password, skills } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "Email does not Exist!!" });

    // Check if the username is being updated and if it already exists
    if (username !== user.username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername)
        return res.status(400).json({ error: "Username already exists" });
    }
    // Hash the password only if it's being updated
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await User.findOneAndUpdate(
      { email },
      {
        name,
        username,
        password: hashedPassword,
        skills,
      },
      { new: true }
    );

    return res.status(201).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
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
    return res.status(500).json({ message: "Internal server error" });
  }
};
