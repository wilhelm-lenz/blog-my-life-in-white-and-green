import { useContext } from "react";
import CardList from "../components/cardList/CardList";
import "./Blog.scss";
import { BlogPostsContext } from "../contexts/blogPostsContext";

const Blog = () => {
  return (
    <main className="main-blog container">
      <CardList />
    </main>
  );
};

export default Blog;
