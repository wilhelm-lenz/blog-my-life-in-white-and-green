import { v4 as uuidv4 } from "uuid";

import CardItem from "../cardItem/CardItem";
import blogData from "../../data/blogData";
import "./CardList.scss";

const CardList = () => {
  return (
    <section className="card-list container">
      {blogData.map((blogPostObj) => {
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
