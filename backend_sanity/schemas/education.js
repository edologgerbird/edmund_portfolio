export default {
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    {
      name: "year",
      title: "Year",
      type: "string",
    },
    {
      name: "educations",
      title: "Educations",
      type: "array",
      of: [{ type: "school" }],
    },
  ],
};
