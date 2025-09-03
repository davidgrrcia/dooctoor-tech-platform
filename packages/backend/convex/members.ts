import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Member data structure validation
const memberArgs = {
  nickname: v.string(),
  name: v.string(),
  surname: v.string(),
  gender: v.string(),
  dateOfBirth: v.string(),
  bloodType: v.string(),
  rh: v.string(),
  allergies: v.string(),
  medication: v.string(),
  majorDiseases: v.string(),
  background: v.string(),
  email: v.string(),
  phone: v.string(),
  address: v.string(),
  emergencyContacts: v.array(
    v.object({
      name: v.string(),
      relationship: v.string(),
      phone: v.string(),
    }),
  ),
  insurance: v.object({
    company: v.string(),
    policyNumber: v.string(),
    coverages: v.string(),
    validFrom: v.string(),
    validTo: v.string(),
  }),
};

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

// Mutation to create a new member
export const createMember = mutation({
  args: memberArgs,
  handler: async (ctx, args) => {
    const now = Date.now();
    const memberId = await ctx.db.insert("members", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return memberId;
  },
});

// Mutation to update an existing member
export const updateMember = mutation({
  args: {
    id: v.id("members"),
    ...memberArgs,
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    await ctx.db.patch(id, {
      ...updateData,
      updatedAt: Date.now(),
    });
    return id;
  },
});

// Mutation to delete a member
export const deleteMember = mutation({
  args: { id: v.id("members") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
