import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  return (
    <section className="section-navigation">
      <nav className="container nav-bar">
        <Link to="/" className="logo">
          My Life in <span className="white-color">White</span> and{" "}
          <span className="green-color">Green</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
      </nav>
    </section>
  );
};

export default Nav;
