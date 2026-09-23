CREATE TABLE `museum_progress` (
	`profile_id` text PRIMARY KEY NOT NULL,
	`visited_locations` text DEFAULT '[]' NOT NULL,
	`owned_finds` text DEFAULT '[]' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
