import { useParams } from "react-router-dom";
import "./BlogPostDetails.scss";
import { useContext } from "react";
import { BlogPostsContext } from "../contexts/blogPostsContext";
import CalenderMain from "../components/images/CalenderMain";

const BlogPostDetails = () => {
  const { blogPosts } = useContext(BlogPostsContext);
  const { id: idOfBlogPost } = useParams();
  console.log(blogPosts);
  console.log(idOfBlogPost);
  const blogPost = blogPosts.filter(
    (singleBlogObj) => singleBlogObj._uid === idOfBlogPost
  );
  console.log(blogPost);
  const {
    attachment,
    author,
    blogStatus,
    categories,
    content,
    description,
    id,
    publishedAt,
    seoKeywords,
    title,
    _uid,
  } = blogPost[0];

  const date = new Date(publishedAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const fullYear = date.getFullYear();
  const publishedDate = `${day}. ${month} ${fullYear}`;

  return (
    <>
      <section key={idOfBlogPost} className="container section-blog-post">
        <img
          src={`http://localhost:3066/${attachment}`}
          alt={"Picture taken by " + author}
          className="blog-post-img"
        />
        <div className="blog-post-title-and-date-wrapper">
          <h3 className="blog-post-title">{title}</h3>
        </div>
        <p className="blog-post-author">{author}</p>
        <p className="blog-post-published-date">
          {<CalenderMain />}
          {publishedDate}
        </p>
        <div className="content-wrapper">
          <p className="blog-post-content">{content}</p>
          <aside className="sidebar">gdfsgds</aside>
        </div>
      </section>
    </>
  );
};

export default BlogPostDetails;
