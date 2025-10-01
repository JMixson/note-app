import { paginationOptsValidator } from "convex/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { ERROR_MESSAGES } from "@/lib/error-messages";

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

export const getPublicNoteById = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUserNoteById = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }

    const userId = identity.subject;

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const note = await ctx.db.get(args.id);

    if (!note) {
      throw new Error(ERROR_MESSAGES.NOTE_NOT_FOUND);
    }

    if (note.userId !== userId) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }

    return note;
  },
});

export const createNote = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    isPrivate: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }

    const userId = identity.subject;

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const noteId = await ctx.db.insert("notes", {
      title: args.title,
      content: args.content,
      isPrivate: args.isPrivate,
      updatedTime: Date.now(),
      userId: user._id,
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
      throw new Error(ERROR_MESSAGES.NOTE_NOT_FOUND);
    }

    const updatedTime = Date.now();
    await ctx.db.patch(args.id, { ...args.update, updatedTime });

    return { ...note, ...args.update, updatedTime };
  },
});
