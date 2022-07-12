import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <h2 className="head-text">
        <span>Contact</span>Me
      </h2>
      <div className="app__footer app__flex">
        <div className="app__footer-info">
          <h4>Email</h4>
          <a href="mailto:edmundlohhongtak@gmail.com">
            edmundlohhongtak@gmail.com
          </a>
        </div>

        <div className="app__footer-copyright">
          <p>Copyright © 2022 All rights reserved | Edmund Loh</p>
        </div>

        <div className="app__footer-badges">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <AiFillLinkedin />
          </a>
          <a href="https://www.github.com" target="_blank" rel="noreferrer">
            <AiFillGithub />
          </a>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__secondarybg"
);
