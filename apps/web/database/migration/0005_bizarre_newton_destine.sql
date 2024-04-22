CREATE TABLE IF NOT EXISTS "instant_meeting" (
	"id" text PRIMARY KEY NOT NULL,
	"host_role" text NOT NULL,
	"host_id" text NOT NULL,
	"title" text NOT NULL,
	"date" date NOT NULL,
	"start_time" text NOT NULL,
	"end_time" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "schedule_meeting" (
	"id" text PRIMARY KEY NOT NULL,
	"teacher_id" text NOT NULL,
	"subject_id" text NOT NULL,
	"title" text NOT NULL,
	"date" date NOT NULL,
	"start_time" text NOT NULL,
	"end_time" text NOT NULL,
	"camera" boolean DEFAULT false NOT NULL,
	"visibility" boolean DEFAULT false NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "instant_meeting" ADD CONSTRAINT "instant_meeting_host_id_user_id_fk" FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule_meeting" ADD CONSTRAINT "schedule_meeting_teacher_id_user_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule_meeting" ADD CONSTRAINT "schedule_meeting_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
