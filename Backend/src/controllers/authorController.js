const authorModel = require("../models/authorModel.js");
const bookModel = require("../models/bookModel.js");
const jwt = require("jsonwebtoken");

const createAuthor = async (req, res) => {
  const { email, name, bio, profile_img } = req.body;

  if (!email | !name) {
    return res.status(400).json({
      message: "All Fields are required",
    });
  }

  const exists = await authorModel.findOne({ email });

  if (exists) {
    return res.status(400).json({
      message: "Author already exists",
    });
  }
  const author = await authorModel.create({
    name,
    email,
    bio,
    profile_img,
  });

  const token = jwt.sign({ id: author._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Author Created Sucessfully",
    author,
    token,
  });
};

const allAuthors = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const authors = await authorModel
    .find()
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);

  const result = [];

  for (let author of authors) {
    const bookCount = await bookModel.countDocuments({
      author_id: author._id,
    });

    result.push({
      ...author.toObject(),
      TotalNumber_of_books: bookCount,
    });
  }
  res.json({
    message: "All authors Fetched",
    data: result,
  });
};

const approveAuthor = async (req, res) => {
  const author = await authorModel.findById(req.params.id);

  if (!author) {
    return res.status(404).json({
      message: "No user found",
    });
  }

  author.status = "approved";
  await author.save();

  res.json({
    message: "Author approved Sucessfully",
    author,
  });
};

module.exports = { createAuthor, allAuthors, approveAuthor };
