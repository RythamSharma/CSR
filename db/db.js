import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:3000/SSRproject");
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
