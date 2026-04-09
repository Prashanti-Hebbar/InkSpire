import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/bookstore";

const dbconnection = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

export default dbconnection;