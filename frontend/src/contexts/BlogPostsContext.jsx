import { createContext, useState } from "react";

const BlogPostsContext = createContext();

const BlogPostsContextProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  return (
    <BlogPostsContext.Provider value={{ blogPosts, setBlogPosts }}>
      {children}
    </BlogPostsContext.Provider>
  );
};

export { BlogPostsContext, BlogPostsContextProvider };
