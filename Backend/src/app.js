const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes.js");

const app = express();
connectDB();

//
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // Converts Clients data in JS
app.use(express.urlencoded({ extended: true })); // Converts form Data into JS
app.use(cookieParser()); // Reads Cookies by the server

// API Routes
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);

module.exports = app;
