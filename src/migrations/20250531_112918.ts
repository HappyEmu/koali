import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "koalas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar,
  	"date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "koalas_id" integer;
  DO $$ BEGIN
   ALTER TABLE "koalas" ADD CONSTRAINT "koalas_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "koalas_image_idx" ON "koalas" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "koalas_updated_at_idx" ON "koalas" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "koalas_created_at_idx" ON "koalas" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_koalas_fk" FOREIGN KEY ("koalas_id") REFERENCES "public"."koalas"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_koalas_id_idx" ON "payload_locked_documents_rels" USING btree ("koalas_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "koalas" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "koalas" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_koalas_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_koalas_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "koalas_id";`)
}
