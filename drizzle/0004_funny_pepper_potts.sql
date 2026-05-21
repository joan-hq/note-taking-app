ALTER TABLE "notes" ADD COLUMN "date" varchar(10);--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "type" text DEFAULT 'manual' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "user_date_ai_unq" ON "notes" USING btree ("user_id","date");