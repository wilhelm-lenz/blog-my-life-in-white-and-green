const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { v4: uuidv4 } = require("uuid");
const blogPosts = require("./blogPostsData.json");

const { readJSONFilePromise, writeJSONFilePromise } = require("./fsUtils");

const app = express();

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

app.use(cors()); // Cors policy
app.use(logger("dev")); // logging request information
app.use(express.json()); // body parser for all incoming requests

app.get("/api/allBlogPosts", (_, res) => {
  readJSONFilePromise("./blogPostsData.json")
    .then((blogPosts) => {
      res.status(OK).json({ success: true, result: blogPosts });
    })
    .catch((err) => {
      console.log(err);
      res.status(INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Faild to load Blog Posts. Server Error",
      });
    });
});

app.post("/api/allBlogPosts", (req, res) => {
  const publishedDate = new Date(Date.now());
  let continuousId = 0;
  let isblogPostsArrayEmpty = blogPosts.length === 0;

  if (isblogPostsArrayEmpty) {
    continuousId = 1;
  } else {
    continuousId = blogPosts[blogPosts.length - 1]?.id + 1;
  }
  console.log(continuousId);
  const {
    title,
    featuredImage,
    content,
    author,
    categories,
    seoKeywords,
    slug,
  } = req.body;

  const newBlogPost = {
    id: continuousId,
    title,
    featuredImage,
    content,
    description: content.substring(0, 10) + "...",
    author,
    publishedAt: publishedDate,
    categories,
    blogStatus: ["published", "draft", "review", "archived"],
    seoKeywords,
    slug,
    _uid: uuidv4(),
  };

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
});

app.patch("/api/allBlogPosts/:id/updatedBlogPost", (req, res) => {
  const paramsId = req.params.id;
  const { title, content, author, categories, seoKeywords, slug } = req.body;

  const updatedBlogPostObj = {
    title,
    content,
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
});

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
