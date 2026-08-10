import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const museumProgress = sqliteTable("museum_progress", {
  profileId: text("profile_id").primaryKey(),
  visitedLocations: text("visited_locations").notNull().default("[]"),
  ownedFinds: text("owned_finds").notNull().default("[]"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
