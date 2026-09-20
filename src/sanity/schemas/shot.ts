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
      description:
        "The shot itself, or the poster frame for a video shot. Optional for videos: without it the tile takes the video's own proportions once it loads.",
      validation: (r) => r.custom((value, ctx) => (value || (ctx.document as { video?: unknown })?.video ? true : "Add an image or a video.")),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload an MP4 to make this a video shot.",
      validation: (r) => r.custom((value, ctx) => (value || (ctx.document as { image?: unknown })?.image ? true : "Add an image or a video.")),
    }),
    defineField({ name: "order", title: "Order", type: "number", description: "Lower numbers come first." }),
  ],
  orderings: [{ title: "Manual order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "year", media: "image", video: "video" },
    prepare: ({ title, subtitle, media, video }) => ({ title, subtitle: `${subtitle}${video ? " · Video" : ""}`, media }),
  },
});
