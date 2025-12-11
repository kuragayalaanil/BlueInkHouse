const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected Sucessfully");
  } catch (error) {
    console.log("Error in Connecting DB", error);
  }
};

module.exports = connectDB;
