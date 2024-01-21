import "./CardItem.scss";
import Button from "../buttons/Button";
import { Link } from "react-router-dom";
import CalenderMain from "../svg/CalenderMain";
import TrashIcon from "../svg/TrashIcon";

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
  updateTodosArray,
}) => {
  const date = new Date(publishedAt);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const fullYear = date.getFullYear();
  const publishedDate = `${day}. ${month} ${fullYear}`;

  const deleteTodo = () => {
    fetch(`http://localhost:3066/api/allBlogPosts/${_uid}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ success, articles, error }) => {
        if (!success) throw error;
        else updateTodosArray(articles);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <article className="card-item">
        <Link to={`/blog/${_uid}`}>
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
        </Link>
        <span className="delete-todo" onClick={() => deleteTodo(id)}>
          <TrashIcon />
        </span>
      </article>
    </>
  );
};

export default CardItem;
