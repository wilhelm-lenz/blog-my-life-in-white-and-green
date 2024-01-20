import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Nav from "./components/nav/Nav";
import BlogPost from "./components/blogPost/BlogPost";
import { BlogPostsContextProvider } from "./contexts/blogPostsContext";
import FetchBlogPostsData from "./fetchData/fetchBlogPostsData";

function App() {
  return (
    <>
      <BlogPostsContextProvider>
        <FetchBlogPostsData />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </BlogPostsContextProvider>
    </>
  );
}

export default App;
