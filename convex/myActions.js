"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { action } from "./_generated/server.js";
import { GOOGLE_API_KEY } from "./env.js";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splittedText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splittedText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: GOOGLE_API_KEY,
        modelName: "embedding-001", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "completed";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: GOOGLE_API_KEY,
        modelName: "embedding-001", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const results = await vectorStore.similaritySearch(args.query, 1);
    console.log("All results:", results);
    const resultOne = results.filter((q) => q.metadata.fileId === args.fileId);
    console.log("Filtered results:", resultOne);
    return JSON.stringify(resultOne);
  },
});
