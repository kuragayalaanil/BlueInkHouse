const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  genre: {
    type: String,
  },
  cover_image_url: {
    type: String,
    default: "",
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const bookModel = mongoose.model("book", bookSchema);
module.exports = bookModel;
