import {int, sqliteTable as table, text} from "drizzle-orm/sqlite-core"

export const users = table("users", {
  id: int("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
});