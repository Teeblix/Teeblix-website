import { defineField, defineType } from "sanity";

// Drops: articles that also go out as a Resend broadcast when published.
export const drop = defineType({
  name: "drop",
  title: "Drop",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, description: "One or two lines shown in the list and in the email." }),
    defineField({ name: "cover", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "richText" }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "Optional, max 160 characters.",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "notifiedAt",
      title: "Email sent at",
      type: "datetime",
      readOnly: true,
      description: "Set automatically once subscribers have been emailed about this Drop.",
    }),
  ],
  orderings: [{ title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "cover" } },
});
