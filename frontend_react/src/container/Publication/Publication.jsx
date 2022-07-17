import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Publication.scss";

const Publication = () => {
  const defaultFilter = "Featured";
  const [tagsList, setTagsList] = useState([]);
  const [publications, setPublications] = useState([]);
  const [filterPublication, setFilterPublication] = useState([]);
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  function sortByTitle(array) {
    return array.sort(function(a, b) {
      var x = a.title;
      var y = b.title;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  const handlePublicationFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterPublication(publications);
      } else {
        setFilterPublication(
          publications.filter((publication) => publication.tags.includes(item))
        );
      }
    }, 500);
  };

  useEffect(() => {
    const query = '*[_type == "publications"]';
    const tagQuery = '*[_type == "tags"]';

    client.fetch(tagQuery).then((data) => {
      data = data.filter((work) => work.page.includes("Publications"));
      console.log(data[0].tags);
      data = data[0].tags;
      setTagsList(data);
    });

    client.fetch(query).then((data) => {
      data = sortByTitle(data);
      setPublications(data);
      data = data.filter((work) => work.tags.includes(defaultFilter));
      setFilterPublication(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        My<span>Publications</span>
      </h2>
      <div className="app__publication-filter">
        {tagsList.map((item, index) => (
          <div
            key={index}
            onClick={() => handlePublicationFilter(item)}
            className={`app__publication-filter-item app__flex p-text ${
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
        className="app__publication-portfolio"
      >
        {filterPublication.map((publication, index) => (
          <a
            href={publication.articleLink}
            target="_blank"
            rel="noreferrer"
            className="noDecoration"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.001 }}
              className="app__publication-item app__flex"
              key={index}
            >
              <div className="app__publication-img app__flex">
                <img src={urlFor(publication.imgUrl)} alt={publication.name} />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    staggerChildren: 0.5,
                  }}
                  className="app__publication-hover app__flex"
                >
                  <a
                    href={publication.articleLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.01 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                </motion.div>
              </div>

              <div className="app__publication-content">
                <h4 className="bold-text">{publication.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>
                  {publication.description}
                </p>
                <div className="app__publication-platform app__flex">
                  <p className="p-text italic-text">{publication.platform}</p>
                </div>
                <div className="app__flex">
                  <div className="app__publication-tag app__flex">
                    <p className="p-text">{publication.tags[0]}</p>
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
  MotionWrap(Publication, "app__publications"),
  "publications",
  "app__secondarybg"
);
