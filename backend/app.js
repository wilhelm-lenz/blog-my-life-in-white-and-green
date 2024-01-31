const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const blogPostRouter = require("./src/routes/blogPostRoutes");

const app = express();

app.use(cors()); // Cors policy
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // logging request information
}
app.use(express.json()); // body parser for all incoming requests

app.use(express.static("./data/uploads"));

app.use("/api/v1/allBlogPosts", blogPostRouter);

// Error Message if Route not found
app.use((_, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

module.exports = app;
