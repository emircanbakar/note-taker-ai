import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const AddFileToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      fileName: args.fileName,
      fileUrl: args.fileUrl,
      storageId: args.storageId,
      createdBy: args.createdBy,
    });
  },
});

export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const getFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    console.log(res, "res");

    return res[0];
  },
});

export const GetUserFiles = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const res = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .collect();

    return res;
  },
});
