import { useContext, useEffect, useState } from "react";
import "./SearchBar.scss";

import { BlogPostsContext } from "../../contexts/blogPostsContext";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { blogPosts, searchTerm, setSearchTerm, queryTerm, setQueryTerm } =
    useContext(BlogPostsContext);
  const [isSerchModalOpen, setIsSearchModalOpen] = useState(false);
  console.log(searchTerm);

  // Opens the automatic auto-completion of the search function
  const openSearchModal = () => {
    if (searchTerm.length > 0) {
      setIsSearchModalOpen(true);
    } else {
      setIsSearchModalOpen(false);
    }
  };
  console.log(queryTerm);
  useEffect(() => {
    openSearchModal();
  }, [searchTerm, isSerchModalOpen, queryTerm]);

  const filterdPosts = blogPosts?.filter((blogPost) =>
    blogPost[queryTerm].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="section-search-bar container">
      <div className="search-wrapper">
        <input
          type="search"
          name="searchTerm"
          id="searchTerm"
          className="search-bar"
          placeholder="Search for / in ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          name="selectQuery"
          id="selectQuery"
          className="select-query"
          onChange={(e) => setQueryTerm(e.target.value) || "title"}
        >
          <option className="query-option" value="title">
            Title
          </option>
          <option className="query-option" value="author">
            Author
          </option>
          <option className="query-option" value="content">
            Full Content
          </option>
        </select>
      </div>
      <div
        className={`search-autocomplete-modal ${
          isSerchModalOpen ? "open-search-modal" : "close-search-modal"
        }`}
        onKeyDown={openSearchModal}
      >
        {filterdPosts.map((filteredBlogPost, index) => {
          console.log(filteredBlogPost);
          // Show max 10 elements
          if (index < 10) {
            return (
              <Link
                to={`/blog/${filteredBlogPost?._uid}`}
                className="autocomplete-term"
                key={filteredBlogPost.id}
              >
                {filteredBlogPost.title}
              </Link>
            );
          }
        })}
      </div>
    </section>
  );
};

export default SearchBar;
