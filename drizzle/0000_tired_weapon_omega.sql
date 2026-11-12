CREATE TABLE `quote_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`window_start` integer NOT NULL,
	`count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quote_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`payload_hash` text NOT NULL,
	`locale` text NOT NULL,
	`mode` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`payload` text NOT NULL,
	`artwork_key` text,
	`artwork_name` text,
	`artwork_content_type` text,
	`artwork_bytes` integer,
	`artwork_review_status` text,
	`status` text DEFAULT 'received' NOT NULL,
	`notification_status` text DEFAULT 'not_configured' NOT NULL,
	`marketing_consent` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `quote_reference_unique` ON `quote_requests` (`reference`);--> statement-breakpoint
CREATE UNIQUE INDEX `quote_idempotency_unique` ON `quote_requests` (`idempotency_key`);--> statement-breakpoint
CREATE INDEX `quote_created_at_index` ON `quote_requests` (`created_at`);