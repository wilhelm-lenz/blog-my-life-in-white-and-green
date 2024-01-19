const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { readFilePromise, writeFilePromise } = require("./fsUtils");

const app = express();

app.use(cors()); // Cors policy
app.use(logger("dev")); // logging request information
app.use(express.json()); // body parser for all incoming requests

// Error Message if Route not found
app.use((_, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.get("/api/allBlogPosts", (req, res) => {});

const PORT = 3066;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => console.log(`Server run on ${HOST}:${PORT}`));
