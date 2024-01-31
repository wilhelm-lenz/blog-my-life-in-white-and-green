import { useContext, useEffect, useState } from "react";
import { BlogPostsContext } from "../contexts/blogPostsContext";
import "./Admin.scss";

const Admin = () => {
  const { setBlogPosts } = useContext(BlogPostsContext);
  const [attachment, setAttachment] = useState();
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [title, setTitle] = useState("");

  const addBlogPost = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("categories", categories);
    formData.append("seoKeywords", seoKeywords);
    if (attachment) {
      formData.append("attachment", attachment, attachment.name);
    }

    fetch("http://localhost:3066/api/v1/allBlogPosts", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ success, articles, error }) => {
        if (!success) console.log(error);
        else setBlogPosts(articles);
      });

    setAuthor("");
    setTitle("");
    setContent("");
    setCategories("");
    setSeoKeywords("");
    document.getElementById("file").value = "";
  };

  return (
    <main>
      <section className="container form-wrapper">
        <h2 className="heading-secondary">Add NEW POST</h2>
        <div className="author-file-wrapper">
          <label htmlFor="author">
            Author
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>

          <span className="choose-file">
            <input
              type="file"
              name="file"
              id="file"
              className="inputfile"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </span>
        </div>

        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Blog Post Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label htmlFor="content">
          Content
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder="Your Content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </label>
        <div className="categories-seoKeywords-wrapper">
          <label htmlFor="categories">
            <div className="multiply-words-wrapper">
              Categories
              <span className="multiply-words">
                ( separate multiple with comma )
              </span>
            </div>
            <input
              type="text"
              name="categories"
              id="categories"
              placeholder="Categories of the Blog Post..."
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
          </label>
          <label htmlFor="seoKeywords">
            <div className="multiply-words-wrapper">
              SEO Keywords
              <span className="multiply-words">
                ( separate multiple with comma )
              </span>
            </div>
            <input
              type="text"
              name="seoKeywords"
              id="seoKeywords"
              placeholder="Your SEO Keywords"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
            />
          </label>
        </div>
        <button className="add-blog-post-btn" onClick={addBlogPost}>
          Add Blog Post
        </button>
      </section>
    </main>
  );
};

export default Admin;
