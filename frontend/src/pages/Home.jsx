import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <header className="header">
        {/* <img
          src="../../public/snowboard-img.jpg"
          alt="hero image"
          className="hero-img"
        /> */}
        <section className="container section-hero">
          <h1 className="heading-primary">
            Welcome to my <span className="highlighting">life Blog</span>
          </h1>
          <Link to="/blog">
            <Button contentText={"Go to articles"} />
          </Link>
        </section>
      </header>
      <main className="main"></main>
    </>
  );
};

export default Home;
