import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notes").collect();
  },
});

export const createNote = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert("notes", {
      title: args.title,
      author: args.author,
      content: args.content,
      updatedTime: Date.now(),
    });
    return noteId;
  },
});
