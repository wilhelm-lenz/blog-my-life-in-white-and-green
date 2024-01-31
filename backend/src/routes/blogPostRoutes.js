const express = require("express");

const multer = require("multer");
const { blogPostController } = require("../controllers");

const router = express.Router();

// --> für uploaded Files direkt mit richtigem Namen gespeichert werden, muss diskstorage bearbeitet werden:
const attachmentStorage = multer.diskStorage({
  destination: "./uploads/",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// --> MULTER-MIDDLEWARE erstellen mit angaben für storage:
const uploadMiddleware = multer({ storage: attachmentStorage });

// const uploadMiddleware = multer({ dest: "./uploads" });

router
  .route("/")
  .get(blogPostController.getAllPosts)
  .post(uploadMiddleware.single("attachment"), blogPostController.createPost);

router
  .route("/:id")
  .patch(uploadMiddleware.single("attachment"), blogPostController.updatePost)
  .delete(blogPostController.deletPost);

module.exports = router;
