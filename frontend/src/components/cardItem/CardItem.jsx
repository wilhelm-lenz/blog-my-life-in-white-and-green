import "./CardItem.scss";
import Button from "../buttons/Button";
import { Link } from "react-router-dom";
import CalenderMain from "../svg/CalenderMain";

const CardItem = ({
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
}) => {
  const date = new Date(publishedAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const fullYear = date.getFullYear();
  const publishedDate = `${day}. ${month} ${fullYear}`;

  return (
    <>
      <Link to={`/blog/${_uid}`}>
        <article className="card-item">
          <img
            src={`http://localhost:3066/${attachment}`}
            alt={"Picture taken by " + author}
            className="card-item-image"
          />

          <h3 className="card-item-title">{title}</h3>
          <p className="card-item-description">{description}</p>
          <p className="published-date">
            {<CalenderMain />} {publishedDate}
          </p>
        </article>
      </Link>
    </>
  );
};

export default CardItem;
