import {int, sqliteTable as table, text} from "drizzle-orm/sqlite-core"

export const users = table("users", {
  id: int("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
});

export const posts = table("posts", {
  id: int("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
});

export const comments = table("comments", {
  id: int("id").primaryKey(),
  postId: int("post_id").notNull().references(() => posts.id, {onDelete: "cascade"}),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull(),
});