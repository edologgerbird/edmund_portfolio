import React from "react";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import "./Header.scss";

const Header = () => (
  <div className="app__header app__flex">
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="app__header-info"
    >
      <div className="app__header-badge">
        <div>
          <p className="subtitle">Hello, I'm</p>
          <h1 className="title">Edmund</h1>
        </div>

        <div className="tag-cmp app__flex">
          <p>Data Scientist, Data Engineer, Financial Risk Analyst</p>
        </div>
      </div>
    </motion.div>
  </div>
);

export default AppWrap(Header, "home");
