import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    title: v.string(),
    author: v.string(),
    content: v.string(),
    updatedTime: v.number(),
  }),
});
