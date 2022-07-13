import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);

  function sortByYear(array) {
    return array.sort(function(a, b) {
      var x = a.year;
      var y = b.year;
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }

  function sortByName(array) {
    return array.sort(function(a, b) {
      var x = a.name;
      var y = b.name;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';
    const educationQuery = '*[_type == "education"]';

    client.fetch(query).then((data) => {
      data = sortByYear(data);
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      data = sortByName(data);
      setSkills(data);
    });

    client.fetch(educationQuery).then((data) => {
      data = sortByYear(data);
      setEducation(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        <span>Skills</span>&<span>Experiences</span>
      </h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          <div className="app__skills-title">
            <h2>Education</h2>
          </div>
          {education.map((edu) => (
            <motion.div className="app__skills-exp-item" key={edu.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text-year">{edu.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {edu.educations.map((school) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={school.school}
                      key={school.school}
                    >
                      <h4 className="bold-text">{school.school}</h4>
                      <p className="p-text">{school.desc}</p>
                    </motion.div>
                    <ReactTooltip
                      id={school.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {school.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
          <div className="app__skills-title">
            <h2>Work Experience</h2>
          </div>
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text-year">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="app__skills-resume">
        <a
          href="https://www.dropbox.com/sh/v605ocql9gqc4yc/AAAp06YmdGxyyHjUYeFI0z8Qa?dl=0"
          target="_blank"
          rel="noreferrer"
        >
          View my Full Resume
        </a>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__secondarybg"
);
