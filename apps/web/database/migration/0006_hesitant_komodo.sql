ALTER TABLE "schedule_meeting" ADD COLUMN "teacher_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "schedule_meeting" ADD COLUMN "subject_name" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule_meeting" ADD CONSTRAINT "schedule_meeting_teacher_name_user_name_fk" FOREIGN KEY ("teacher_name") REFERENCES "user"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "schedule_meeting" ADD CONSTRAINT "schedule_meeting_subject_name_subjects_name_fk" FOREIGN KEY ("subject_name") REFERENCES "subjects"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
