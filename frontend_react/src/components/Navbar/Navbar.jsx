import React, { useState, useEffect } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

import "./Navbar.scss";

const Navbar = ({ active }) => {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [animation, setAnimation] = useState("open");

  const hideNavBar = async (ms) => {
    setAnimation("close");

    await new Promise((r) => setTimeout(r, ms));

    setShow(false);
  };

  const showNavBar = async (ms) => {
    setAnimation("open");

    await new Promise((r) => setTimeout(r, ms));

    setShow(true);
  };

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        hideNavBar(300);
      } else {
        // if scroll up show the navbar
        showNavBar(5);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <nav className="app__navbar">
      {show && (
        <div className={`app__navbar ${animation}`}>
          <ul className="app__navbar-links">
            {["home", "about", "work", "skills", "contact"].map((item) => (
              <li className="app__flex p-text" key={`link-${item}`}>
                <div />
                <a href={`#${item}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, duration: 0.005 }}
              exit="hidden"
            >
              <HiX onClick={() => setToggle(false)} />
              <ul>
                {["home", "about", "work", "skills", "contact"].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
