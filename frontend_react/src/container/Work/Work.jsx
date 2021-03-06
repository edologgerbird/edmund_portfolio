import React, { useState, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

const Work = () => {
  const defaultFilter = "Featured";
  const [works, setWorks] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  function sortByTitle(array) {
    return array.sort(function(a, b) {
      var x = a.title;
      var y = b.title;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  useEffect(() => {
    const query = '*[_type == "works"]';
    const tagQuery = '*[_type == "tags"]';

    client.fetch(tagQuery).then((data) => {
      data = data.filter((work) => work.page.includes("Works"));
      console.log(data[0].tags);
      data = data[0].tags;
      setTagsList(data);
    });

    client.fetch(query).then((data) => {
      data = sortByTitle(data);
      setWorks(data);
      data = data.filter((work) => work.tags.includes(defaultFilter));
      setFilterWork(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        My<span>Works</span>
      </h2>
      <div className="app__work-filter">
        {tagsList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <a
            href={work.codeLink}
            target="_blank"
            rel="noreferrer"
            className="noDecoration"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.001 }}
              className="app__work-item app__flex"
              key={index}
            >
              <div className="app__work-img app__flex">
                <img src={urlFor(work.imgUrl)} alt={work.name} />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    staggerChildren: 0.5,
                  }}
                  className="app__work-hover app__flex"
                >
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.01 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                </motion.div>
              </div>

              <div className="app__work-content">
                <h4 className="bold-text">{work.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>
                  {work.description}
                </p>
                <div className="app__flex">
                  <div className="app__work-tag app__flex">
                    <p className="p-text">{work.tags[0]}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </a>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
