import { Link, useParams } from "react-router-dom";
import "./BlogPostDetails.scss";
import { useContext, useEffect } from "react";
import { BlogPostsContext } from "../contexts/blogPostsContext";
import CalenderMain from "../components/svg/CalenderMain";

const BlogPostDetails = () => {
  const { id: idOfBlogPost } = useParams();
  const { blogPosts } = useContext(BlogPostsContext);

  const blogPost = blogPosts?.filter(
    (singleBlogObj) => singleBlogObj?._uid === idOfBlogPost
  );

  if (!blogPost[0]) {
    return;
  }

  const { attachment, author, categories, content, publishedAt, title } =
    blogPost[0];

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
          <aside className="sidebar">
            <span className="heading-tertiary">Latest posts</span>
            {blogPosts
              .filter((blogPost) => blogPost._uid !== idOfBlogPost)
              .map((filteredBlogPost) => (
                <div key={filteredBlogPost._uid} className="link-wrapper">
                  <span className="list-link-styler"></span>
                  <Link
                    className="sidebar-links"
                    to={`/blog/${filteredBlogPost._uid}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {filteredBlogPost.title}
                  </Link>
                </div>
              ))}
          </aside>
        </div>
      </section>
    </>
  );
};

export default BlogPostDetails;
