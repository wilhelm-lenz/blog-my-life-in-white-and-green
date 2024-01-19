import "./CardItem.scss";
import Button from "../buttons/Button";
import { Link } from "react-router-dom";

const CardItem = ({ id, blogTitle, imgUrl, author }) => {
  return (
    <article className="card-item">
      <img
        src={imgUrl}
        alt={"Picture taken by " + author}
        className="card-item-image"
      />

      <h3 className="card-item-title">{blogTitle}</h3>
      <Link to={`/blog/${id}`}>
        <Button contentText={"Read more"} />
      </Link>
    </article>
  );
};

export default CardItem;
