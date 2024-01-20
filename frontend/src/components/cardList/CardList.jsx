import CardItem from "../cardItem/CardItem";

import "./CardList.scss";
import { useContext } from "react";
import { BlogPostsContext } from "../../contexts/blogPostsContext";

const CardList = () => {
  const { blogPosts } = useContext(BlogPostsContext);

  return (
    <section className="card-list container">
      {blogPosts?.map((blogPostObj) => {
        const {
          attachment,
          author,
          blogStatus,
          categories,
          content,
          description,
          publishedAt,
          seoKeywords,
          title,
          _uid,
        } = blogPostObj;
        return (
          <CardItem
            key={_uid}
            _uid={_uid}
            attachment={attachment}
            author={author}
            blogStatus={blogStatus}
            categories={categories}
            content={content}
            description={description}
            publishedAt={publishedAt}
            seoKeywords={seoKeywords}
            title={title}
          />
        );
      })}
    </section>
  );
};

export default CardList;
