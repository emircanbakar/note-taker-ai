import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),

  pdfFiles: defineTable({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  }),

  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),

  notes: defineTable({
    fileId: v.string(),
    notes: v.any(),
    createdBy: v.string(),
  }),

  mergedPdfs: defineTable({
    mergedFileId: v.string(),
    originalFiles: v.array(v.string()), // Array of original file IDs/names
    mergedFileName: v.string(),
    mergedFileUrl: v.string(),
    storageId: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
    fileSize: v.number(),
  }),
});
