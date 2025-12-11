const mongoose = require("mongoose");
const { type } = require("os");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profile_img: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const authorModel = mongoose.model("author", authorSchema);
module.exports = authorModel;
