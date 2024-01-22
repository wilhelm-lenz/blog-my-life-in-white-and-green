import { createContext, useState } from "react";

const BlogPostsContext = createContext();

const BlogPostsContextProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [queryTerm, setQueryTerm] = useState("title");

  return (
    <BlogPostsContext.Provider
      value={{
        blogPosts,
        setBlogPosts,
        searchTerm,
        setSearchTerm,
        queryTerm,
        setQueryTerm,
      }}
    >
      {children}
    </BlogPostsContext.Provider>
  );
};

export { BlogPostsContext, BlogPostsContextProvider };
