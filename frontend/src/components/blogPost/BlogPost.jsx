import { useParams } from "react-router-dom";
import blogData from "../../data/blogData";
import "./BlogPost.scss";

const BlogPost = () => {
  const idOfBlogPost = Number(useParams().id);
  const user = blogData.filter(
    (singleUserObj) => singleUserObj.id === idOfBlogPost
  );
  const { img_url, title, description, author, published_date } = user[0];
  return (
    <>
      <section key={idOfBlogPost} className="container section-blog-post">
        <img
          src={img_url}
          alt={"Picture taken by " + author}
          className="blog-post-img"
        />
        <div className="blog-post-title-and-date-wrapper">
          <h3 className="blog-post-title">{title}</h3>
          <p className="blog-post-published-date">{published_date}</p>
        </div>
        <p className="blog-post-description">{description}</p>
        <p className="blog-post-author">{author}</p>
      </section>
    </>
  );
};

export default BlogPost;
