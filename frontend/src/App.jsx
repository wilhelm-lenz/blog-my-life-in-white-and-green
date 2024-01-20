import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Nav from "./components/nav/Nav";
import BlogPostDetails from "./pages/BlogPostDetails";
import { BlogPostsContextProvider } from "./contexts/blogPostsContext";
import FetchBlogPostsData from "./fetchData/fetchBlogPostsData";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <BlogPostsContextProvider>
        <FetchBlogPostsData />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetails />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BlogPostsContextProvider>
    </>
  );
}

export default App;
