import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const museumProgress = sqliteTable("museum_progress", {
  profileId: text("profile_id").primaryKey(),
  visitedLocations: text("visited_locations").notNull().default("[]"),
  ownedFinds: text("owned_finds").notNull().default("[]"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const communityPosts = sqliteTable("community_posts", {
  id: text("id").primaryKey(),
  profileId: text("profile_id").notNull(),
  author: text("author").notNull(),
  body: text("body").notNull(),
  locationId: text("location_id"),
  imageKeys: text("image_keys").notNull().default("[]"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  appreciations: integer("appreciations").notNull().default(0),
}, (table) => [
  index("idx_community_posts_created_at").on(table.createdAt),
  index("idx_community_posts_profile_created").on(table.profileId, table.createdAt),
]);

export const siteVisits = sqliteTable("site_visits", {
  visitId: text("visit_id").primaryKey(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
