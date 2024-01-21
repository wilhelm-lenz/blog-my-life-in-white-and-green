const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const blogPosts = require("./blogPostsData.json");
const { readJSONFilePromise, writeJSONFilePromise } = require("./fsUtils");

// const uploadFileWithDestination = multer({ dest: "./uploads" });

const app = express();

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

app.use(cors()); // Cors policy
app.use(logger("dev")); // logging request information
app.use(express.json()); // body parser for all incoming requests

app.use(express.static("uploads"));

app.get("/api/allBlogPosts", (_, res) => {
  readJSONFilePromise("./blogPostsData.json")
    .then((blogPosts) => {
      res.status(OK).json({ success: true, articles: blogPosts });
    })
    .catch((err) => {
      console.log(err);
      res.status(INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Faild to load Blog Posts. Server Error",
      });
    });
});

// --> für uploaded Files direkt mit richtigem Namen gespeichert werden, muss diskstorage bearbeitet werden:
const attachmentStorage = multer.diskStorage({
  destination: "./uploads/",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// // --> MULTER-MIDDLEWARE erstellen mit angaben für storage:
const uploadMiddleware = multer({ storage: attachmentStorage });

// const uploadMiddleware = multer({ dest: "./uploads" });

app.post(
  "/api/allBlogPosts",
  uploadMiddleware.single("attachment"),
  (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const publishedDate = new Date(Date.now());

    let continuousId = 0;
    let isblogPostsArrayEmpty = blogPosts.length === 0;
    if (isblogPostsArrayEmpty) {
      continuousId = 1;
    } else {
      continuousId = blogPosts[blogPosts.length - 1]?.id + 1;
    }

    const { title, content, author, categories, seoKeywords, slug } = req.body;

    const newBlogPost = {
      id: continuousId,
      title,
      content,
      description: content.substring(0, 160) + "...",
      author,
      publishedAt: publishedDate,
      categories: categories.split(",").map((categorie) => categorie.trim()),
      blogStatus: ["published", "draft", "review", "archived"],
      seoKeywords: seoKeywords
        .split(",")
        .map((seoKeyword) => seoKeyword.trim()),
      slug,
      _uid: uuidv4(),
    };

    if (req.file) {
      newBlogPost.attachment = req.file.filename;
    }

    readJSONFilePromise("./blogPostsData.json")
      .then((blogPosts) => [...blogPosts, newBlogPost])
      .then((newBlogPostsArray) =>
        writeJSONFilePromise("./blogPostsData.json", newBlogPostsArray)
      )
      .then((newBlogPostsArray) =>
        res.status(OK).json({ success: true, articles: newBlogPostsArray })
      )
      .catch((err) => {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).json({
          success: false,
          error: "Faild to add Blog Posts. Server Error",
        });
      });
  }
);

app.patch(
  "/api/allBlogPosts/:id/updatedBlogPost",
  uploadMiddleware.single("attachment"),
  (req, res) => {
    const paramsId = req.params.id;
    const {
      title,
      content,
      description,
      author,
      categories,
      seoKeywords,
      slug,
    } = req.body;

    const updatedBlogPostObj = {
      title,
      content,
      description,
      author,
      categories,
      seoKeywords,
      slug,
    };

    readJSONFilePromise("./blogPostsData.json")
      .then((blogPosts) => {
        const updatedBlogPosts = blogPosts.map((blogPost) =>
          blogPost._uid === paramsId
            ? {
                ...blogPost,
                title: updatedBlogPostObj.title,
                content: updatedBlogPostObj.content,
                description:
                  updatedBlogPostObj.content.substring(0, 160) + "...",
                author: updatedBlogPostObj.author,
                categories: updatedBlogPostObj.categories,
                seoKeywords: updatedBlogPostObj.seoKeywords,
                slug: updatedBlogPostObj.slug,
              }
            : blogPost
        );
        return updatedBlogPosts;
      })
      .then((newBlogPostsArray) =>
        writeJSONFilePromise("./blogPostsData.json", newBlogPostsArray).then(
          (newBlogPostsArray) =>
            res.status(OK).json({ success: true, articles: newBlogPostsArray })
        )
      )
      .catch((err) => {
        console.log(err);
        res.status(INTERNAL_SERVER_ERROR).json({
          success: false,
          error: "Faild to delete blog post. Server Error",
        });
      });
  }
);

app.delete("/api/allBlogPosts/:id", (req, res) => {
  const paramsId = req.params.id;

  readJSONFilePromise("./blogPostsData.json")
    .then((blogPosts) => {
      const newBlogPostsWithoutDelete = blogPosts.filter(
        (blogPost) => blogPost._uid !== paramsId
      );
      return newBlogPostsWithoutDelete;
    })
    .then((newBlogPostArray) =>
      writeJSONFilePromise("./blogPostsData.json", newBlogPostArray).then(
        (newBlogPostArray) =>
          res.status(OK).json({ success: true, articles: newBlogPostArray })
      )
    )
    .catch((err) => {
      console.log(err);
      res.status(INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Faild to delete blog post. Server Error",
      });
    });
});

// Error Message if Route not found
app.use((_, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

const PORT = 3066;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => console.log(`Server run on ${HOST}:${PORT}`));
