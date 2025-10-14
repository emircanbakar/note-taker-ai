/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as env from "../env.js";
import type * as fileStorage from "../fileStorage.js";
import type * as langchain_db from "../langchain/db.js";
import type * as mergedPdfs from "../mergedPdfs.js";
import type * as myActions from "../myActions.js";
import type * as notes from "../notes.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  env: typeof env;
  fileStorage: typeof fileStorage;
  "langchain/db": typeof langchain_db;
  mergedPdfs: typeof mergedPdfs;
  myActions: typeof myActions;
  notes: typeof notes;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
