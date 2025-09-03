import { v } from "convex/values";
import { query } from "./_generated/server";

// Query to get all members
export const getAllMembers = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db.query("members").order("desc").collect();
    return members;
  },
});

// Query to get a single member by ID
export const getMemberById = query({
  args: { id: v.id("members") },
  handler: async (ctx, args) => {
    const member = await ctx.db.get(args.id);
    return member;
  },
});
