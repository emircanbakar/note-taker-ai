import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save merged PDF information
export const saveMergedPdf = mutation({
  args: {
    mergedFileId: v.string(),
    originalFiles: v.array(v.string()),
    mergedFileName: v.string(),
    mergedFileUrl: v.string(),
    storageId: v.string(),
    createdBy: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("mergedPdfs", {
      ...args,
      createdAt: Date.now(),
    });
    return result;
  },
});

// Get user's merged PDFs
export const getUserMergedPdfs = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const mergedPdfs = await ctx.db
      .query("mergedPdfs")
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .order("desc")
      .collect();

    return mergedPdfs;
  },
});

// Get specific merged PDF
export const getMergedPdf = query({
  args: {
    mergedFileId: v.string(),
  },
  handler: async (ctx, args) => {
    const mergedPdf = await ctx.db
      .query("mergedPdfs")
      .filter((q) => q.eq(q.field("mergedFileId"), args.mergedFileId))
      .first();

    return mergedPdf;
  },
});

// Delete merged PDF
export const deleteMergedPdf = mutation({
  args: {
    mergedFileId: v.string(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const mergedPdf = await ctx.db
      .query("mergedPdfs")
      .filter((q) =>
        q.and(
          q.eq(q.field("mergedFileId"), args.mergedFileId),
          q.eq(q.field("createdBy"), args.userEmail)
        )
      )
      .first();

    if (!mergedPdf) {
      throw new Error("Merged PDF not found or unauthorized");
    }

    // Delete from storage
    if (mergedPdf.storageId) {
      await ctx.storage.delete(mergedPdf.storageId);
    }

    // Delete from database
    await ctx.db.delete(mergedPdf._id);

    return { success: true };
  },
});
