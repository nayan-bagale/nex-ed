import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const connection = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(connection, { schema });

