const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const asyncWrapperMiddleware = require("../middlewares/asyncWrapperMiddleware.js");

const {
  addBook,
  allBooks,
  searchBooks,
} = require("../controllers/bookController");
const router = express.Router();

// Create Book
router.post("/", authMiddleware, asyncWrapperMiddleware(addBook));

// All Books
router.get("/", asyncWrapperMiddleware(allBooks));

// Author Approval
router.get("/search", asyncWrapperMiddleware(searchBooks));

module.exports = router;
