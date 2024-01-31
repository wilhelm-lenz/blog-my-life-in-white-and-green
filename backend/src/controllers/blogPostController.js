const { readJSONFilePromise, writeJSONFilePromise } = require("../../fsUtils");
const {
  filterCategories,
  filterTitle,
  filterContent,
  filterAuthor,
} = require("../../filterBlogPosts");
const { OK, INTERNAL_SERVER_ERROR } = require("../controllers/httpStatusCodes");
const { v4: uuidv4 } = require("uuid");
const blogPosts = require("../../blogPostsData.json");

exports.getAllPosts = (req, res) => {
  const category = req.query.category;
  const title = req.query.title;
  const content = req.query.content;
  const author = req.query.author;
  // const publishedAt = req.query.publishedAt;

  readJSONFilePromise("./blogPostsData.json")
    .then((blogPosts) => {
      const updatedBlogPosts = blogPosts
        .filter((blogPost) => filterCategories(blogPost, category))
        .filter((blogPost) => filterTitle(blogPost, title))
        .filter((blogPost) => filterContent(blogPost, content))
        .filter((blogPost) => filterAuthor(blogPost, author));
      // .filter((blogPost) => filterPublishedAt(blogPost, publishedAt))
      res.status(OK).json({ success: true, articles: updatedBlogPosts });
    })
    .catch((err) => {
      console.log(err);
      res.status(INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Faild to load Blog Posts. Server Error",
      });
    });
};

exports.createPost = (req, res) => {
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
    categories: categories?.split(",").map((categorie) => categorie.trim()),
    blogStatus: ["published", "draft", "review", "archived"],
    seoKeywords: seoKeywords.split(",").map((seoKeyword) => seoKeyword.trim()),
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
};

exports.updatePost = (req, res) => {
  const paramsId = req.params.id;
  const { title, content, description, author, categories, seoKeywords, slug } =
    req.body;

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
              description: updatedBlogPostObj.content.substring(0, 160) + "...",
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
};

exports.deletPost = (req, res) => {
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
};
