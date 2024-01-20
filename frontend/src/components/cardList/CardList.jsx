import { v4 as uuidv4 } from "uuid";

import CardItem from "../cardItem/CardItem";

import "./CardList.scss";
import { useContext } from "react";
import { BlogPostsContext } from "../../contexts/blogPostsContext";

const CardList = () => {
  const { blogPosts } = useContext(BlogPostsContext);
  console.log(blogPosts);
  return (
    <section className="card-list container">
      {blogPosts?.map((blogPostObj) => {
        console.log(blogPostObj);
        const { id, title, img_url, author } = blogPostObj;
        return (
          <CardItem
            key={uuidv4()}
            id={id}
            blogTitle={title}
            imgUrl={img_url}
            author={author}
          />
        );
      })}
    </section>
  );
};

export default CardList;
