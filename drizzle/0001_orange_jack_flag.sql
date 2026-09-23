CREATE TABLE `community_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`author` text NOT NULL,
	`body` text NOT NULL,
	`location_id` text,
	`image_keys` text DEFAULT '[]' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`appreciations` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_community_posts_created_at` ON `community_posts` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_community_posts_profile_created` ON `community_posts` (`profile_id`,`created_at`);