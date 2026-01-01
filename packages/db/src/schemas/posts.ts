import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { usersTable } from "./auth";
import { commentsTable } from "./comments";
import { postUpvotesTable } from "./upvotes";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url"),
  content: text("content"),
  points: integer("points").default(0).notNull(),
  commentCount: integer("comment_count").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const insertPostSchema = createInsertSchema(postsTable);

export const createPostSchema = insertPostSchema
  .and(
    z.object({
      title: z
        .string()
        .min(3, { error: "Title must be at least 3 characters long" }),
      url: z.url().trim().optional(),
      content: z.string().optional(),
    }),
  )
  .refine((data) => data.url || data.content, {
    error: "Either URL or content must be provided",
    path: ["url", "content"],
  });

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
    relationName: "author",
  }),
  postUpvotesTable: many(postUpvotesTable, {
    relationName: "postUpvotes",
  }),
  comments: many(commentsTable),
}));
