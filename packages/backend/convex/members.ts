import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
  args: {
    // Personal Information
    nickname: v.string(),
    name: v.string(),
    surname: v.string(),
    gender: v.string(),
    dateOfBirth: v.string(),

    // Health Information
    bloodType: v.string(),
    rh: v.string(),
    height: v.string(),
    weight: v.string(),
    allergies: v.string(),
    medication: v.string(),
    majorDiseases: v.string(),
    background: v.string(),

    // Contact Information
    email: v.string(),
    phone: v.string(),
    address: v.string(),

    // Emergency Contacts
    emergencyContacts: v.array(
      v.object({
        name: v.string(),
        relationship: v.string(),
        phone: v.string(),
      }),
    ),

    // Insurance Information
    insurance: v.object({
      company: v.string(),
      policyNumber: v.string(),
      coverages: v.string(),
      validFrom: v.string(),
      validTo: v.string(),
    }),
  },
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
    // Personal Information
    nickname: v.optional(v.string()),
    name: v.optional(v.string()),
    surname: v.optional(v.string()),
    gender: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),

    // Health Information
    bloodType: v.optional(v.string()),
    rh: v.optional(v.string()),
    height: v.optional(v.string()),
    weight: v.optional(v.string()),
    allergies: v.optional(v.string()),
    medication: v.optional(v.string()),
    majorDiseases: v.optional(v.string()),
    background: v.optional(v.string()),

    // Contact Information
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),

    // Emergency Contacts
    emergencyContacts: v.optional(
      v.array(
        v.object({
          name: v.string(),
          relationship: v.string(),
          phone: v.string(),
        }),
      ),
    ),

    // Insurance Information
    insurance: v.optional(
      v.object({
        company: v.string(),
        policyNumber: v.string(),
        coverages: v.string(),
        validFrom: v.string(),
        validTo: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;

    // Remove undefined values
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined),
    );

    if (Object.keys(cleanUpdateData).length === 0) {
      throw new Error("No fields to update");
    }

    await ctx.db.patch(id, {
      ...cleanUpdateData,
      updatedAt: Date.now(),
    });

    return id;
  },
});
