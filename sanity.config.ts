"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "teeblix",
  title: "Teeblix",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("shot").title("Shots"),
            S.documentTypeListItem("drop").title("Drops"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
