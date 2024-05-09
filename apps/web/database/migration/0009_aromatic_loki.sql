CREATE TABLE IF NOT EXISTS "attendance" (
	"id" text PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"subject_id" text NOT NULL,
	"subject_name" text NOT NULL,
	"mode" text NOT NULL,
	"total_students" integer NOT NULL,
	"percentage" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "attended" (
	"id" serial PRIMARY KEY NOT NULL,
	"attendance_id" text NOT NULL,
	"student_id" text NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendance" ADD CONSTRAINT "attendance_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attended" ADD CONSTRAINT "attended_attendance_id_attendance_id_fk" FOREIGN KEY ("attendance_id") REFERENCES "attendance"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attended" ADD CONSTRAINT "attended_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
