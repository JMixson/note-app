import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    authId: v.string(),
    displayName: v.string(),
  }).index("by_authId", ["authId"]),

  notes: defineTable({
    title: v.string(),
    content: v.string(),
    isPrivate: v.boolean(),
    updatedTime: v.number(),
    userId: v.id("users"),
  })
    .index("by_isPrivate", ["isPrivate"])
    .index("by_userId", ["userId"]),
});
