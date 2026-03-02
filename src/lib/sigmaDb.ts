// src/lib/sigmaDb.ts
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __sigma_sql__: ReturnType<typeof postgres> | undefined;
}

export function getSigmaSql() {
  const url = process.env.SIGMA_DATABASE_URL;

  // Important: ne pas throw au build time
  if (!url) return null;

  // cache en dev/hot-reload
  if (!globalThis.__sigma_sql__) {
    globalThis.__sigma_sql__ = postgres(url, {
      ssl: false,
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }
  return globalThis.__sigma_sql__!;
}