CREATE TABLE `community_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`parent_id` text,
	`author` text NOT NULL,
	`body` text NOT NULL,
	`client_hash` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `community_posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_comments_post_time` ON `community_comments` (`post_id`,`created_at`,`id`);--> statement-breakpoint
CREATE INDEX `idx_comments_client_time` ON `community_comments` (`client_hash`,`created_at`);