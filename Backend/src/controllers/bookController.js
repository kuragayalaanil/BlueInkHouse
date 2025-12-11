const authorModel = require("../models/authorModel.js");
const bookModel = require("../models/bookModel");

const addBook = async (req, res) => {
  const { title, description, genre, cover_image_url } = req.body;

  if (!title) {
    return res.json(400).json({
      message: "Title is a required field",
    });
  }

  const author_id = req.user.id;

  const author = await authorModel.findById(author_id);

  if (!author) {
    return res.status(400).json({
      message: "Author not found",
    });
  }

  if (author.status !== "approved") {
    return res.status(400).json({ message: "Author must be approved" });
  }

  const book = await bookModel.create({
    title,
    description,
    genre,
    cover_image_url,
    author_id,
  });

  res.json({
    message: "Books created Sucessfully",
    book,
  });
};

const allBooks = async (req, res) => {
  const books = await bookModel.find({});

  res.json({
    message: "All Books Fetched Sucessfully",
    books,
  });
};

const searchBooks = async (req, res) => {
  const { genre, author } = req.query;

  const filter = {};
  if (genre) {
    filter.genre = genre;
  }

  if (author) {
    const foundAuthors = await authorModel.find(
      { name: { $regex: author, $options: "i" } },
      "_id" // only get _id
    );

    filter.author_id = { $in: foundAuthors.map((a) => a._id) };

    const books = await bookModel.find(filter).populate("author_id", "name");

    res.json({
      message: "Searching Books",
      books,
    });
  }
};

module.exports = { addBook, allBooks, searchBooks };
