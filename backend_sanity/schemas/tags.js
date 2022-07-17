export default {
  name: "tags",
  title: "Tags",
  type: "document",
  fields: [
    {
      name: "page",
      title: "Page",
      type: "string",
    },

    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
          validation: (Rule) => Rule.required().min(1),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
