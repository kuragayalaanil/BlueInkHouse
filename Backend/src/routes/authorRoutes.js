const express = require("express");
const asyncWrapperMiddleware = require("../middlewares/asyncWrapperMiddleware.js");

const {
  createAuthor,
  allAuthors,
  approveAuthor,
} = require("../controllers/authorController");
const router = express.Router();

// Create Author
router.post("/", asyncWrapperMiddleware(createAuthor));

// All Authors
router.get("/", asyncWrapperMiddleware(allAuthors));

// Author Approval
router.patch("/:id/approve", asyncWrapperMiddleware(approveAuthor));

module.exports = router;
