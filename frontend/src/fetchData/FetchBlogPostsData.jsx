import { useContext, useEffect } from "react";
import { BlogPostsContext } from "../contexts/blogPostsContext";

const FetchBlogPostsData = () => {
  const { blogPosts, setBlogPosts } = useContext(BlogPostsContext);

  useEffect(() => {
    fetch("http://localhost:3066/api/allBlogPosts", { method: "GET" })
      .then((res) => res.json())
      .then(({ success, articles, error }) => {
        console.log(articles);
        if (!success) console.log(error);
        else setBlogPosts(articles);
      });
  }, []);

  return <></>;
};

export default FetchBlogPostsData;
