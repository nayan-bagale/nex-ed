ALTER TABLE "subjects" ADD COLUMN "teacher_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "subjects" ADD COLUMN "teacher_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subjects" ADD CONSTRAINT "subjects_teacher_id_user_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
