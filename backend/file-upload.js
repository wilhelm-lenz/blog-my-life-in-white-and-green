const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");

const uploadFileWithDestination = multer({ dest: "./upload" });

const app = express();

app.use(cors()); // Cors policy
app.use(logger("dev")); // logging request information
app.use(express.json());

app.post(
  "/api/upload/blogImage",
  uploadFileWithDestination.single("blogPostImg"),
  (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.status(200).json({});
  }
);

// Error Message if Route not found
app.use((_, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

const PORT = 3067;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => console.log(`Server run on ${HOST}:${PORT}`));

module.exports = {
  uploadFile,
};
