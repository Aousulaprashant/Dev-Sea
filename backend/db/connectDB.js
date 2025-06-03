const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const ConnectDB = async () => {
  const URL = process.env.MONGODB_URL;
  // console.log(process.env.MONGODB_URL);
  try {
    await mongoose
      .connect(URL)
      .then(() => {
        console.log("Successfully Connected DB ✅");
      })
      .catch((err) => console.error("MongoDB Error:", err));
  } catch (e) {
    console.error("Database connection failed:", e);
  }
};

module.exports = ConnectDB;
