import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { createAuth, authComponent } from "./auth";

export const ensureUser = mutation({
  args: {
    displayName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .unique();

    if (existingUser) {
      return existingUser;
    }

    return await ctx.db.insert("users", {
      userId: identity.subject,
      displayName: args.displayName || "Unknown",
    });
  },
});

export const updateUserPassword = mutation({
  args: {
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    await createAuth(ctx).api.changePassword({
      body: {
        currentPassword: args.currentPassword,
        newPassword: args.newPassword,
      },
      headers: await authComponent.getHeaders(ctx),
    });
  },
});
