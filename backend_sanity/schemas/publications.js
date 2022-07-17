export default {
  name: "publications",
  title: "Publications",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },

    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "articleLink",
      title: "Article Link",
      type: "string",
    },
    {
      name: "platform",
      title: "Platform",
      type: "string",
    },
    {
      name: "imgUrl",
      title: "ImageUrl",
      type: "image",
      options: {
        hotspot: true,
      },
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
