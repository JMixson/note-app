import { paginationOptsValidator } from "convex/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getPublicNotes = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_isPrivate", (q) => q.eq("isPrivate", false))
      .order("desc")
      .take(args.limit || 50);
  },
});

export const getNote = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
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

export const deleteNote = mutation({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id);

    if (note) {
      await ctx.db.delete(args.id);
    }
    return note;
  },
});

export const paginateNotes = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .order("desc")
      .paginate(args.paginationOpts);
    return notes;
  },
});

export const paginatePublicNotes = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_isPrivate", (q) => q.eq("isPrivate", false))
      .order("desc")
      .paginate(args.paginationOpts);
    return notes;
  },
});

export const editNote = mutation({
  args: {
    id: v.id("notes"),
    update: v.object({
      title: v.optional(v.string()),
      author: v.optional(v.string()),
      content: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id);

    if (!note) {
      throw new Error("Note does not exist");
    }

    const updatedTime = Date.now();
    await ctx.db.patch(args.id, { ...args.update, updatedTime });

    return { ...note, ...args.update, updatedTime };
  },
});
