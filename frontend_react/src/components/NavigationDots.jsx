import React from "react";

const NavigationDots = ({ active }) => (
  <div className="app__navigation">
    {[
      "home",
      "about",
      "work",
      "publications",
      "skills",
      "testimonial",
      "contact",
    ].map((item, index) => (
      <a
        href={`#${item}`}
        key={item + index}
        className="app__navigation-dot"
        style={active === item ? { backgroundColor: "#ec4556" } : {}}
      />
    ))}
  </div>
);

export default NavigationDots;

// "#ec4556"
