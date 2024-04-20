import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  posts: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  connections: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

export default mongoose.model("User", userSchema);
