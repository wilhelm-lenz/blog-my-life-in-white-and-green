import { useContext, useEffect } from "react";
import { BlogPostsContext } from "../contexts/blogPostsContext";

const FetchBlogPostsData = () => {
  const { blogPosts, setBlogPosts, searchTerm, setSearchTerm, queryTerm } =
    useContext(BlogPostsContext);

  useEffect(() => {
    async function fetchByQuerySelection() {
      const res = await fetch(
        `http://localhost:3066/api/v1/allBlogPosts?${queryTerm}=${searchTerm}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

      const { success, articles, error } = data;

      if (!success) console.log(error);
      else setBlogPosts(articles);
    }

    fetchByQuerySelection();

    // async function fetchTitle() {
    //   const res = await fetch(
    //     `http://localhost:3066/api/allBlogPosts?category=${searchTerm}`,
    //     {
    //       method: "GET",
    //     }
    //   );
    //   const data = await res.json();

    //   const { success, articles, error } = data;

    //   if (!success) console.log(error);
    //   else setBlogPosts(articles);
    // }

    // async function fetchTitle() {
    //   const res = await fetch(
    //     `http://localhost:3066/api/allBlogPosts?title=${searchTerm}`,
    //     {
    //       method: "GET",
    //     }
    //   );
    //   const data = await res.json();

    //   const { success, articles, error } = data;

    //   if (!success) console.log(error);
    //   else setBlogPosts(articles);
    // }

    // async function fetchContent() {
    //   const res = await fetch(
    //     `http://localhost:3066/api/allBlogPosts?${queryTerm}=${searchTerm}`,
    //     {
    //       method: "GET",
    //     }
    //   );
    //   const data = await res.json();

    //   const { success, articles, error } = data;

    //   if (!success) console.log(error);
    //   else setBlogPosts(articles);
    // }

    // async function fetchAuthor() {
    //   const res = await fetch(
    //     `http://localhost:3066/api/allBlogPosts?author=${searchTerm}`,
    //     {
    //       method: "GET",
    //     }
    //   );
    //   const data = await res.json();

    //   const { success, articles, error } = data;

    //   if (!success) console.log(error);
    //   else setBlogPosts(articles);
    // }

    // fetchCategory();
    // fetchTitle();
    // fetchContent();
    // fetchAuthor();
  }, [searchTerm]);

  return <></>;
};

export default FetchBlogPostsData;
