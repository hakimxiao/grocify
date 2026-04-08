import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.EXPO_PUBLIC_DATABASE_URL;
if (!databaseUrl) throw new Error("EXPO_PUBLIC_DATABASE_URL is required.");

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema });
