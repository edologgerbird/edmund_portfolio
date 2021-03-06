import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [bio, setBio] = useState([]);

  useEffect(() => {
    const bioQuery = '*[_type == "bio"]';
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });

    client.fetch(bioQuery).then((data) => {
      setBio(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        Enabling <span>Data-Driven</span> Decision-making <br />
      </h2>

      <div className="bio">
        {bio.map((bio_content) => (
          <>
            <img src={urlFor(bio_content.imgUrl)} atl={bio_content.ImgUrl} />
            <div className="bio-text">
              <h4>About Me</h4>
              <p>{bio_content.description}</p>
            </div>
          </>
        ))}
      </div>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__secondarybg"
);
