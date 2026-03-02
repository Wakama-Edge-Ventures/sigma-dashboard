// src/lib/sigmaDb.ts
import postgres from "postgres";

const SIGMA_DATABASE_URL = process.env.SIGMA_DATABASE_URL;

if (!SIGMA_DATABASE_URL) {
  throw new Error("Missing SIGMA_DATABASE_URL");
}

// Server-side only. Do not import this file in client components.
export const sql = postgres(SIGMA_DATABASE_URL, {
  ssl: false,
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});