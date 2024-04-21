CREATE TABLE IF NOT EXISTS "stream" (
	"id" text PRIMARY KEY NOT NULL,
	"subject_id" text NOT NULL,
	"teacher_id" text NOT NULL,
	"date" date NOT NULL,
	"description" text NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"files" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_has_subject" (
	"student_id" text NOT NULL,
	"subject_id" text NOT NULL,
	"enrolled" boolean DEFAULT false NOT NULL,
	CONSTRAINT "student_has_subject_student_id_subject_id_pk" PRIMARY KEY("student_id","subject_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subjects" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teacher_has_subject" (
	"teacher_id" text NOT NULL,
	"subject_id" text NOT NULL,
	CONSTRAINT "teacher_has_subject_teacher_id_subject_id_pk" PRIMARY KEY("teacher_id","subject_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stream" ADD CONSTRAINT "stream_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stream" ADD CONSTRAINT "stream_teacher_id_user_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_has_subject" ADD CONSTRAINT "student_has_subject_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_has_subject" ADD CONSTRAINT "student_has_subject_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teacher_has_subject" ADD CONSTRAINT "teacher_has_subject_teacher_id_user_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teacher_has_subject" ADD CONSTRAINT "teacher_has_subject_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
