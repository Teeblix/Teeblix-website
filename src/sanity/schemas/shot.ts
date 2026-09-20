import { defineField, defineType } from "sanity";

export const shot = defineType({
  name: "shot",
  title: "Shot",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", title: "Year", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "The shot itself. For a video shot, this is the poster frame and also sets the tile's proportions.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: { accept: "video/*" },
      description: "Optional. Upload an MP4 to make this a video shot.",
    }),
    defineField({ name: "order", title: "Order", type: "number", description: "Lower numbers come first." }),
  ],
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "year", media: "image", video: "video" },
    prepare: ({ title, subtitle, media, video }) => ({ title, subtitle: `${subtitle}${video ? " · Video" : ""}`, media }),
  },
});
