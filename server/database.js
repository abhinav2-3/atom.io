import mongoose from "mongoose";

export const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI, { dbName: "dev_io" });
    console.log("DB is connected");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
};
