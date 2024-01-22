exports.filterCategories = (blogPost, category) => {
  if (!category) {
    return true;
  }

  return blogPost.categories.includes(category);
};

exports.filterTitle = (blogPost, title) => {
  if (!title) {
    return true;
  }

  return blogPost.title.toLowerCase().includes(title.toLowerCase());
};

exports.filterAuthor = (blogPost, author) => {
  if (!author) {
    return true;
  }

  return blogPost.author.toLowerCase().includes(author.toLowerCase());
};

exports.filterContent = (blogPost, content) => {
  if (!content) {
    return true;
  }

  return blogPost.content.toLowerCase().includes(content.toLowerCase());
};

// exports.filterPublishedAt = (blogPost, publishedAt) => {
//   if (!publishedAt) {
//     return true;
//   }

//   return blogPost.categories.includes(blogStatus);
// };
