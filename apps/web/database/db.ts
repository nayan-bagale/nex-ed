import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const connection = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(connection, { schema });

// export const insertSurvey = async () =>{
//     return await db.insert(schema.survey_questions).values({title: "The Awareness Atlas?", questions:awarenessAtlas}).returning();
// }

// export const getSurvey = async () =>{
//     return await db.select().from(schema.survey_questions);
// }
