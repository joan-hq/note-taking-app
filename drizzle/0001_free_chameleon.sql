CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "status" SET DEFAULT 'active'::text;--> statement-breakpoint
DROP TYPE "public"."note_status";--> statement-breakpoint
CREATE TYPE "public"."note_status" AS ENUM('active', 'archived', 'trashed');--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."note_status";--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "status" SET DATA TYPE "public"."note_status" USING "status"::"public"."note_status";